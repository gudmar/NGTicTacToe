import { Injectable } from '@angular/core';
import { StrategyKeys, FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { ConstantPool, ThrowStmt } from '@angular/compiler';


//  Decorator for customizing strategy
export function Parametrize(parameters: StrategyParameters){
  return function <T extends { new(...args: any[]): {}}>(constructor: T){
    let getDefaultOrValue = function(key: StrategyKeys, _default: any){
      if (!Object.keys(parameters).includes(key)) return _default;
      if (parameters[key] as any == undefined || parameters[key] == null) return _default;
      return parameters[key]
    }
    return class extends constructor {
      // nrOfElementsInRowToWin = parameters.nrOfElementsInRowToWin;
      expectedNrOfGaps = parameters.expectedNrOfGaps;
      maxGapSize = parameters.maxGapSize != undefined ? parameters.maxGapSize : 0;
      shouldAfterPatternFieldBeEmpty = parameters.shouldAfterPatternFieldBeEmpty;
      shouldBeforePatternFieldBeEmpty= parameters.shouldBeforePatternFieldBeEmpty;
      shouldBeforeOrAfterPatternFieldBeEmpty = parameters.shouldBeforeOrAfterPatternFieldBeEmpty;
      nrOfSearchedFigures = parameters.nrOfSearchedFigures;
      canThereBeASearchedFigureAfterOfBeforePattern = getDefaultOrValue('canThereBeASearchedFigureAfterOfBeforePattern', false)
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class GeneralStrategyService {


  inputArraySlice: string[] = [];
  foundIndexMemory: number[] = [];
  nrOfFoundInRow: number = 0;
  maxNrOfFoundInRowSoFar: number = 0;
  maxNrOfFoundInRowIndexMemory:number[] = []
  figure: FigureNotEmpty = 'Circle';
  nrOfGaps: number = 0;
  gapIndexes: number[] = [];
  // boardSize: number = 0;

  isInGapMeasurementMode: boolean = false;
  currentGapSize: number = 0;

  nrOfElementsInRowToWin:number = 0;
  expectedNrOfGaps: number = 0;
  maxGapSize: number = 0;
  shouldBeforePatternFieldBeEmpty: boolean = true;
  shouldAfterPatternFieldBeEmpty: boolean = true;
  shouldBeforeOrAfterPatternFieldBeEmpty: boolean = false;
  nrOfSearchedFigures: number = 0;
  maxFoundGapSize: number = 0;
  canThereBeASearchedFigureAfterOfBeforePattern: boolean = false;

  // parametrize(parameters: StrategyParameters):void{
  //   this.nrOfElementsInRowToWin = parameters.nrOfElementsInRowToWin;
  //   this.expectedNrOfGaps = parameters.expectedNrOfGaps;
  //   this.maxGapSize = parameters.maxGapSize != undefined ? parameters.maxGapSize : 0;
  //   this.shouldAfterPatternFieldBeEmpty = parameters.shouldAfterPatternFieldBeEmpty;
  //   this.shouldBeforePatternFieldBeEmpty= parameters.shouldBeforePatternFieldBeEmpty;
  //   this.nrOfSearchedFigures = parameters.nrOfSearchedFigures;
  // }

  constructor() {}
  
  clearThisInstanceMemory() {
    this.inputArraySlice = [];
    this.foundIndexMemory = [];
    this.nrOfFoundInRow = 0;
    this.maxNrOfFoundInRowSoFar = 0;
    this.maxNrOfFoundInRowIndexMemory = [];    
    this.figure = 'Circle';
    this.nrOfGaps = 0;
    this.gapIndexes = [];
    this.nrOfElementsInRowToWin = 0;
    this.expectedNrOfGaps= 0;
    this.maxGapSize = 0;
    this.shouldBeforePatternFieldBeEmpty = true;
    this.shouldAfterPatternFieldBeEmpty = true;
    this.shouldBeforeOrAfterPatternFieldBeEmpty = false;
    this.canThereBeASearchedFigureAfterOfBeforePattern = false;

    this.isInGapMeasurementMode = false;
    this.currentGapSize = 0;
    this.maxFoundGapSize = 0;
  }

  addToMemoryForSingleFigureIndex(elementIndex:number):void{
    switch(this.inputArraySlice[elementIndex]){
      case this.figure: {
        this.isInGapMeasurementMode = false;
        this.currentGapSize = 0;
        this.addIndexToMemory(elementIndex);
        break;
      };
      case this.opositeFigure(this.figure): {
        break;
      };
      case "": {
        if (this.currentGapSize > this.maxFoundGapSize) this.maxFoundGapSize = this.currentGapSize;
        if (this.nrOfFoundInRow == 0) return undefined;
        if (this.isInGapMeasurementMode) this.currentGapSize++
        if (!this.isInGapMeasurementMode) this.nrOfGaps++
        this.isInGapMeasurementMode = true;

        if (this.nrOfGaps > this.expectedNrOfGaps) { 
          // this.resetMemory();
          return undefined;
        }
        if (this.currentGapSize > this.maxGapSize) {
          // this.resetMemory();
          return undefined;
        }
        this.gapIndexes.push(elementIndex);

      }
    }
    // debugger;    
  }

  resetMemoryIfPatternCannotBeFound(currentElementIndex: number){
    let currentElement = this.inputArraySlice[currentElementIndex]
    if (currentElement == this.opositeFigure(this.figure)) this.resetMemory();
    if (currentElementIndex == this.inputArraySlice.length && this.nrOfFoundInRow < this.nrOfSearchedFigures) this.resetMemory();
    if (!this.areFoundPatternConditionsMade()) this.resetMemory();
    // if (this.nrOfFoundInRow > this.nrOfSearchedFigures) this.resetMemory();
    // if (this.nrOfGaps > this.expectedNrOfGaps) this.resetMemory();
    // if (this.currentGapSize > this.maxGapSize) this.resetMemory();
  }


  areFoundPatternConditionsMade(){
    if (this.nrOfFoundInRow > this.nrOfSearchedFigures) return false;
    if (this.nrOfGaps > this.expectedNrOfGaps) return false;
    // if (this.maxGapSize > this.currentGapSize) return false;
    if (this.maxFoundGapSize > this.maxGapSize) return false;
    return true;
  }

  checkIfPatternFound(simplifiedElementIndex:number):boolean{
    let test = this.inputArraySlice[simplifiedElementIndex]
    switch(this.inputArraySlice[simplifiedElementIndex]){
      case this.figure: {

        if ((this.nrOfFoundInRow == this.nrOfSearchedFigures) && (this.nrOfGaps == this.expectedNrOfGaps)) {
          if (!this.isFieldAfterPatternFree() && this.shouldAfterPatternFieldBeEmpty) return false
          if (!this.isFieldBeforePatternFree() && this.shouldBeforePatternFieldBeEmpty) return false
          if (this.isFieldAfterTheSameFigure() && !this.canThereBeASearchedFigureAfterOfBeforePattern) return false
          if (this.isFieldBeforeTheSameFigure() && !this.canThereBeASearchedFigureAfterOfBeforePattern) return false
          if (this.shouldBeforeOrAfterPatternFieldBeEmpty) {
            // let a = this.isFieldAfterPatternFree()
            // let b = this.isFieldBeforePatternFree()
            if (!this.isFieldAfterPatternFree() && !this.isFieldBeforePatternFree()) return false
          }
          return true;
        }
        if ((this.nrOfFoundInRow >= this.nrOfSearchedFigures) && (this.nrOfGaps < this.expectedNrOfGaps)) {
          return false;
        }
        // if (this.nrOfGaps != this.expectedNrOfGaps) return false;
        // if (this.currentGapSize > this.maxGapSize) return false;
        if (this.nrOfFoundInRow > this.nrOfSearchedFigures) {
          return false;
        }
        // as this is already the other pattern implementation (0Strategy)
        break;
      };
      case this.opositeFigure(this.figure): {
        break;
      };
      case "": {
        if (this.nrOfFoundInRow == 0) return false;
        if (this.nrOfGaps > this.expectedNrOfGaps) return false;
        if (this.currentGapSize > this.maxGapSize) return false;
      }
    }
    return false;
  }

  isFieldAfterTheSameFigure(){
    let lastIndex = this.getLastPatternFieldIndex();
    if (lastIndex == this.inputArraySlice.length - 1) return false;
    if ((this.inputArraySlice[lastIndex + 1]) == this.figure) return true;
    return false;
  }
  isFieldBeforeTheSameFigure(){
    let firstIndex = this.getFirstPatternFieldIndex()
    if (firstIndex == 0) return false;
    if (this.inputArraySlice[firstIndex - 1] == this.figure) return true;
    return false;
  }

  countNrOfFreeFieldsBeforeFoundPattern(){
    let firstIndex = this.getFirstPatternFieldIndex()
    let nrOfFreeFields = 0;
    let noMoreFreeFields = false;
    for(let i = firstIndex - 1; i >=0; i--){
      // debugger;
      if (this.inputArraySlice[i] != '') noMoreFreeFields = true;
      if (this.inputArraySlice[i] == '' && ! noMoreFreeFields) nrOfFreeFields++;
    }
    return nrOfFreeFields;
  }

  countNrOfFreeFieldsAfterFoundPattern(){
    let lastIndex = this.getLastPatternFieldIndex();
    let nrOfFreeFields = 0;
    let noMoreFreeFields = false;
    for(let i = lastIndex + 1; i < this.inputArraySlice.length; i++){
      // debugger
      if (this.inputArraySlice[i] != '') noMoreFreeFields = true;
      if (this.inputArraySlice[i] == '' && ! noMoreFreeFields) nrOfFreeFields++;
    }
    return nrOfFreeFields;
  }

  getLastPatternFieldIndex(){
    if (this.foundIndexMemory.length == 0) {
      console.warn('getLastPatternFieldIndex: lenght of foundIndexMemory == 0!!')
      return -1
    }
    return Math.max(...this.foundIndexMemory);
  }

  getFirstPatternFieldIndex(){
    if (this.foundIndexMemory.length == 0) {
      console.warn('getLastPatternFieldIndex: lenght of foundIndexMemory == 0!!')
      return -1
    }
    return Math.min(...this.foundIndexMemory);
  }


  isFieldBeforePatternFree(){
    // let firstIndex = Math.min(...this.foundIndexMemory);
    // if (this.isIndexInArrayBoundires(firstIndex - 1) && this.isFieldUnderIndexFree(firstIndex - 1)) return true;
    // return false
    return this.countNrOfFreeFieldsBeforeFoundPattern() >= 1;
  }

  isFieldAfterPatternFree(){
    // let lastIndex = Math.max(...this.foundIndexMemory);
    // if (this.isIndexInArrayBoundires(lastIndex + 1) && this.isFieldUnderIndexFree(lastIndex + 1)) return true;
    // return false
    return this.countNrOfFreeFieldsAfterFoundPattern() >= 1;
  }

  isFieldUnderIndexFree(index: number){
    return this.inputArraySlice[index] == "" ? true : false;
  }

  isIndexInArrayBoundires(index:number){
    if (index < 0) return false;
    if (index >= this.inputArraySlice.length) return false;
    return true;
  }


  addIndexToMemory(index: number){
    this.nrOfFoundInRow = this.nrOfFoundInRow + 1
    this.foundIndexMemory.push(index);

  }

  resetMemory(){
    this.foundIndexMemory = [];
    this.nrOfFoundInRow = 0;
    this.nrOfGaps = 0;
    this.isInGapMeasurementMode = false;

    this.currentGapSize = 0;
    this.maxFoundGapSize = 0;
    this.gapIndexes = [];
    this.maxNrOfFoundInRowSoFar = 0;
    this.maxNrOfFoundInRowIndexMemory = [];    
  
  }

  opositeFigure(figure: Figure){
    if (figure == "Circle") return "Cross";
    if (figure == "Cross")  return "Circle";
    return "";
  }

  isThereAMovePossible(foundPatternIndexes: number[]): boolean{
    // Not needed really
    return false
  }

  getListOfIndexesOfProposedMoves(foundPatternIndexes: number[]):number[]{
    console.log('in get list of indexes')
    if (this.gapIndexes.length == 0) {
      let beforeAfterPatternFreeFields = []
      // let fieldBeforePatternIndex = this.getFirstPatternFieldIndex() - 1;
      // let fieldAfterPatternIndex = this.getLastPatternFieldIndex() + 1;
      if (this.isFieldAfterPatternFree()) beforeAfterPatternFreeFields.push(this.getLastPatternFieldIndex() + 1)
      if (this.isFieldBeforePatternFree()) beforeAfterPatternFreeFields.push(this.getFirstPatternFieldIndex() - 1)
      return beforeAfterPatternFreeFields;
    }
    return this.gapIndexes;
  }

  isFieldEmptyAndInBoundries(queredFieldIndex: number):boolean{
    if (queredFieldIndex < 0) return false;
    if (queredFieldIndex >= this.inputArraySlice.length) return false;
    if (this.inputArraySlice[queredFieldIndex] != '') return false;
    return true;
  }

  isAWinnerPattern(lastFoundIndexOfPatter: number): boolean{
    return false; // in this case gap is needed, so will never be a winner pattern
  }

  getFoundPatternIndexes(): number[]{
    let currentIndex = 0;
    for (let element of this.inputArraySlice) {
      this.addToMemoryForSingleFigureIndex(currentIndex)
      console.log('Index memory')
      console.log(this.foundIndexMemory)
      if (this.checkIfPatternFound(currentIndex)) {
        let temp = this.foundIndexMemory;
        return temp;
      } 
      this.resetMemoryIfPatternCannotBeFound(currentIndex);
      currentIndex++;
    }
    return [];
  }

    getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]):SlicedPatternDescriptor{
      console.log('Board slice: ')
      console.log(boardSlice)
      console.log('THIS OBJECT')
      console.dir(this)
    // this.clearThisInstanceMemory();
    // debugger;
    this.inputArraySlice = boardSlice;
    this.nrOfElementsInRowToWin = nrOfElementsInRowToWin;
    this.figure = figure;
    let foundPatternIndexes = this.getFoundPatternIndexes();
    let foundElementCords = foundPatternIndexes
    let nextMoveProposals = this.getListOfIndexesOfProposedMoves(foundPatternIndexes)
    console.log(`%cPattern output: `, 'background-color: black; color: white; padding: 5px; border-radius: 4px')
    console.log(foundElementCords)
    console.log(nextMoveProposals)
    this.resetMemory();
    console.dir(this)
    // debugger;
    return {
      foundElements: foundElementCords,
      nextMoveProposals: foundElementCords.length > 0 ? nextMoveProposals : [],
    }
  }
}
