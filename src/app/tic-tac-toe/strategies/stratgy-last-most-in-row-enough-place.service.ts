import { Injectable, NgModule } from '@angular/core';
import { FigureNotEmpty, 
  PatternDescriptor, 
  CellDescriptor, 
  Figure, 
  SlicedPatternDescriptor, 
  StrategyImplementator, 
  StrategyParameters 
 } from '../../app.types.d'
import { ConstantPool, ThrowStmt } from '@angular/compiler';
import { tick } from '@angular/core/testing';



 export function SetNrOfFiguresNeededToWinn(nrOfFiguresNeededToWin: number){
  return function <T extends { new(...args: any[]): {}}>(constructor: T){
    return class extends constructor {
      numberOfFiguresInRowNeededToWin = nrOfFiguresNeededToWin;
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class StratgyLastMostInRowEnoughPlace {
  indexOfFirstFoundFigure: number = -1;
  indexOfFirstFoundEmptyField: number = -1;
  indexOfLastFigureFound: number = -1;
  indexOfLastEmptyFieldFound: number = -1;
  numberOfEmptyFieldsFound: number = 0;
  numberOfFiguresFound: number = 0;
  listOfFigureIndexes: number[] = [];
  listOfEmptyFields: number[] = [];

  numberOfFiguresInRowNeededToWin: number = 0;
  sliceOfBoardArray: string[] = [];

  lowerBoundry: number = -1;
  upperBoundry: number = -1;
  constructor() {}

  getPattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[]):SlicedPatternDescriptor{

    return this.getSinglePattern(figure, nrOfFiguresNeededToWin, sliceOfBoardArray, 0);
  }

  setNumberOfFiguresInRowNeededToWin(value: number):void{
    this.numberOfFiguresInRowNeededToWin = value;
  }

  getSinglePattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[], startFromIndex: number = 0):SlicedPatternDescriptor{
    let currentIndex = 0;
    this.sliceOfBoardArray = sliceOfBoardArray;
    let isPatternFound = false;
    for (let element of sliceOfBoardArray){
      if (element == figure) this.rememberFigure(currentIndex);
      if (element == "") this.rememberEmptyField(currentIndex);
      let a = this.isDistanceBetweenFirstFigureAndLastEmptyFieldGreaterThenNrOfNeededToWin()
      if (element == "" && this.isDistanceBetweenFirstFigureAndLastEmptyFieldGreaterThenNrOfNeededToWin()) {
        isPatternFound = this.checkIfPatternIsFound()
      }
      let b = this.isDistanceBetweenFirstLastFiguresGreaterThanNrOfNeededToWin()
      if (element == figure && this.isDistanceBetweenFirstLastFiguresGreaterThanNrOfNeededToWin()) {
        isPatternFound = this.checkIfPatternIsFound()
      }
      if (element == this.opositeFigure(figure)) {
        isPatternFound = this.checkIfPatternIsFound();
        if (!isPatternFound) this.clearMemory();
      }
      if (isPatternFound) {
        let currentPattern = this.getCurrentPatternFromMemory();
        this.clearMemory();
        isPatternFound = false;
        return currentPattern;
      }
      currentIndex++
    }
    isPatternFound = this.checkIfPatternIsFound();
    if (isPatternFound){
      let currentPattern = this.getCurrentPatternFromMemory();
      isPatternFound = false;
      this.clearMemory();
      return currentPattern
    }
      this.clearMemory()
    return this.getEmptyPattern();
  }

  getCurrentPatternFromMemory(){
    let foundElements = this.listOfFigureIndexes;
    let nextMoveProposals = this.listOfEmptyFields.filter(this.isMoveProposalInConstraines.bind(this))
    // if (nextMoveProposals.length == 0) return this.getEmptyPattern();
    return {
      foundElements: foundElements,
      nextMoveProposals: nextMoveProposals,
    }
  }

  isMoveProposalInConstraines(indexOfMoveProposal: number){

    let lowerBoundry = Math.max(this.indexOfLastFigureFound - this.numberOfFiguresInRowNeededToWin, -1); // -1 because of testCase 0
    let upperBoundry = Math.min(this.indexOfFirstFoundFigure + this.numberOfFiguresInRowNeededToWin, this.sliceOfBoardArray.length);
    let isInLowerBoundry = indexOfMoveProposal > lowerBoundry;
    let isInUpperBoundry = indexOfMoveProposal < upperBoundry;
    return isInLowerBoundry && isInUpperBoundry
  }

  clearMemory(){
    this.indexOfFirstFoundFigure = -1;
    this.indexOfFirstFoundEmptyField = -1;
    this.indexOfLastFigureFound = -1;
    this.indexOfLastEmptyFieldFound = -1;
    this.numberOfEmptyFieldsFound = 0;
    this.numberOfFiguresFound = 0;
    this.listOfFigureIndexes = [];
    this.listOfEmptyFields = [];
  }

  checkIfPatternIsFound():boolean{
    
    if (this.indexOfFirstFoundEmptyField == -1) return false;
    if (this.indexOfFirstFoundFigure == -1) return false;
    let slotStart = Math.min(this.indexOfFirstFoundEmptyField, this.indexOfFirstFoundFigure)
    let slotEnd   = Math.max(this.indexOfLastEmptyFieldFound, this.indexOfLastFigureFound)
    if (slotEnd - slotStart < this.numberOfFiguresInRowNeededToWin - 1)  return false; // -1 because of indexing arrays from 0
    
    return true;
  }

  isDistanceBetweenFirstFigureAndLastEmptyFieldGreaterThenNrOfNeededToWin():boolean{
    return this.indexOfLastEmptyFieldFound - this.indexOfFirstFoundFigure >= this.numberOfFiguresInRowNeededToWin
  }

  isDistanceBetweenFirstLastFiguresGreaterThanNrOfNeededToWin():boolean{
    return this.indexOfLastFigureFound - this.indexOfFirstFoundFigure >= this.numberOfFiguresInRowNeededToWin
  }

  rememberFigure(indexOfFigureInSlice: number):void{
    if (this.numberOfFiguresFound == 0) this.indexOfFirstFoundFigure = indexOfFigureInSlice;
    this.numberOfFiguresFound++; 
    this.indexOfLastFigureFound = indexOfFigureInSlice;
    this.listOfFigureIndexes.push(indexOfFigureInSlice);
  }

  rememberEmptyField(indexOfFieldInSlice: number): void{
    if (this.numberOfEmptyFieldsFound == 0) this.indexOfFirstFoundEmptyField = indexOfFieldInSlice;
    this.indexOfLastEmptyFieldFound = indexOfFieldInSlice;
    this.numberOfEmptyFieldsFound++; 
    this.listOfEmptyFields.push(indexOfFieldInSlice);
  }
  

  getEmptyPattern():SlicedPatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }

  opositeFigure(figure: Figure){
    if (figure == "Circle") return "Cross";
    if (figure == "Cross")  return "Circle";
    return "";
  }



  

  countOwnFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]){
    return this.countFigures(figure, boardDescriptor)
  }

  countOponentFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]){
    return this.countFigures(<FigureNotEmpty>this.opositeFigure(figure), boardDescriptor)
  }

  countFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]){
    let nrOfFigures = 0;
    let figureCounter = function(item: CellDescriptor, index: number){
      if (item.figure == figure) nrOfFigures++
    }
    boardDescriptor.forEach(figureCounter);
    return nrOfFigures;
  }

}

