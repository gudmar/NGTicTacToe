import { Injectable, NgModule } from '@angular/core';
import { FigureNotEmpty, 
  PatternDescriptor, 
  CellDescriptor, 
  Figure, 
  SlicedPatternDescriptor, 
  StrategyImplementator, 
  StrategyParameters 
 } from '../../app.types.d'
import { ConstantPool } from '@angular/compiler';


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
  constructor() {}

  getPattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[]):SlicedPatternDescriptor{

    return this.getSinglePattern(figure, nrOfFiguresNeededToWin, sliceOfBoardArray, 0);
  }

  getSinglePattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[], startFromIndex: number = 0):SlicedPatternDescriptor{
    let currentIndex = 0;
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
      if (element == this.opositeFigure(figure)) isPatternFound = this.checkIfPatternIsFound();
      if (isPatternFound) {
        let currentPattern = this.getCurrentPatternFromMemory();
        this.clearMemory();
        console.log(currentPattern)
        return currentPattern;
      }
      currentIndex++
      // debugger;
    }
    this.clearMemory()
    return this.getEmptyPattern();
  }

  getCurrentPatternFromMemory(){
    return {
      foundElements: this.listOfFigureIndexes,
      nextMoveProposals: this.listOfEmptyFields,
    }
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
    if (slotEnd - slotStart < this.numberOfFiguresInRowNeededToWin)  return false;
    // debugger;
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


}

