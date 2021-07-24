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
type PatternSearcher = any;

@Injectable({
  providedIn: 'root'
})
export class StrategyMaxNumberOfFreeFieldsService  {
  listOfFoundFiguresSoFar: number[] = [];
  listOfFoundFiguresInOptimalSolution: number[] = [];
  nrOfFoundFiguresSoFar: number= 0;
  maxNrOfFoundFigures: number = 0;
  sliceBoardArray: string[] = [];
  constructor(){
    
  }

  getPattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[], startFromIndex: number = 0):SlicedPatternDescriptor{
    this.sliceBoardArray = sliceOfBoardArray;
    let currentIndex = 0;
    for (let field of this.sliceBoardArray){
      if (field == "") this.memorize(currentIndex);
      if (field == "Circle" || field == "Cross") this.breakCurrentSolution(currentIndex)
      currentIndex++;
    }
    // debugger;
    if (this.maxNrOfFoundFigures == 0 && this.nrOfFoundFiguresSoFar > 0) this.breakCurrentSolution(currentIndex);
    console.log(currentIndex)
    console.log(this.listOfFoundFiguresInOptimalSolution)
    // debugger
    let temp = [...this.listOfFoundFiguresInOptimalSolution];
    let tempMaxNr = this.maxNrOfFoundFigures;
    this.clearState();
    
    // if (this.maxNrOfFoundFigures > 0) {
    if (tempMaxNr > 0){
      return this.getPatterFromArrays(temp, temp)
      return this.getPatterFromArrays(this.listOfFoundFiguresInOptimalSolution, this.listOfFoundFiguresInOptimalSolution)
    }
    return this.getPatterFromArrays([], []);
  }

  breakCurrentSolution(index: number): void{
    if (this.nrOfFoundFiguresSoFar > this.maxNrOfFoundFigures) {
      this.maxNrOfFoundFigures = this.nrOfFoundFiguresSoFar;
      this.listOfFoundFiguresInOptimalSolution = [...this.listOfFoundFiguresSoFar];
      this.listOfFoundFiguresSoFar = [];
      this.nrOfFoundFiguresSoFar = 0;
    }
  }

  memorize(index: number):void{
    this.listOfFoundFiguresSoFar.push(index);
    this.nrOfFoundFiguresSoFar++
  }

  clearState(){
    this.listOfFoundFiguresSoFar = [];
    this.listOfFoundFiguresInOptimalSolution = [];
    this.nrOfFoundFiguresSoFar = 0;
    this.maxNrOfFoundFigures = 0;
    this.sliceBoardArray = [];
  }

  getPatterFromArrays(foundElements: number[], moveProposals: number[]):SlicedPatternDescriptor{

    return {
      foundElements: [...foundElements],
      nextMoveProposals: [...moveProposals],
    }
  }

}

