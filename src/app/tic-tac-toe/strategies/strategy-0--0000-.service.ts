// strategy-0 means that 0 - highest prio to react
// _0000_ means that nrOfWin computer symbols are in row and are surrounded by empty elements
// In this case at least one empty is needed
// XX_XX means that 2 oponent symbols are one by one, one pause and 2 next oponent symbols are grupped

import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';



@Injectable({
  providedIn: 'root'
})
export class Strategy00000Service implements StrategyImplementator {
  simplifiedArrayToSerachIn: string[] = [];
  foundIndexMemory: number[] = [];
  nrOfFoundInRow = 0;
  maxNrOfFoundInRowSoFar = 0;
  maxNrOfFoundInRowIndexMemory = [];
  nrOfElementsInRowToWin = 0;
  figure: FigureNotEmpty = 'Circle';

  constructor() {}

  clearThisInstanceMemory() {
    this.simplifiedArrayToSerachIn = [];
    this.foundIndexMemory = [];
    this.nrOfFoundInRow = 0;
    this.maxNrOfFoundInRowSoFar = 0;
    this.maxNrOfFoundInRowIndexMemory = [];    
    this.nrOfElementsInRowToWin = 0;
    this.figure = 'Circle';
  }

  checkIfPatternFound(simplifiedElementIndex:number){
    if (this.simplifiedArrayToSerachIn[simplifiedElementIndex] == this.figure) {
      this.foundIndexMemory.push(simplifiedElementIndex);
      this.nrOfFoundInRow++;
    } else {
      this.foundIndexMemory = [];
      this.nrOfFoundInRow = 0;  
    }

    if (this.nrOfFoundInRow == this.nrOfElementsInRowToWin - 1){
      if (this.isAWinnerPattern(simplifiedElementIndex)) return false;
      if (!this.isThereAMovePossible(this.foundIndexMemory)) return false;
      return true
    }
    return false
  }


  isThereAMovePossible(foundPatternIndexes: number[]){
    return this.getListOfIndexesOfProposedMoves(foundPatternIndexes).length > 0 ? true : false;
  }

  getListOfIndexesOfProposedMoves(foundPatternIndexes: number[]){
    let patternIndexes = foundPatternIndexes;
    let indexBeforePattern = Math.min(...foundPatternIndexes) - 1;
    let indexAfterPattern = Math.max(...foundPatternIndexes) + 1;
    let output = [];
    let shouldAddAfter = this.isFieldEmptyAndInBoundries(indexAfterPattern);
    let shouldAddBefore = this.isFieldEmptyAndInBoundries(indexBeforePattern)
    if (this.isFieldEmptyAndInBoundries(indexAfterPattern)) output.push(indexAfterPattern);
    if (this.isFieldEmptyAndInBoundries(indexBeforePattern)) output.push(indexBeforePattern)
    return output;
  }

  isFieldEmptyAndInBoundries(queredFieldIndex: number):boolean{
    if (queredFieldIndex < 0) return false;
    if (queredFieldIndex >= this.simplifiedArrayToSerachIn.length) return false;
    if (this.simplifiedArrayToSerachIn[queredFieldIndex] != '') return false;
    return true;
  }

  isAWinnerPattern(lastFoundIndexOfPatter: number): boolean{
    let nextIndex = lastFoundIndexOfPatter + 1;
    if (nextIndex >= this.simplifiedArrayToSerachIn.length) return false;
    return this.simplifiedArrayToSerachIn[nextIndex] == this.figure ? true : false;
  }

  getFoundPatternIndexes(){
    let currentIndex = 0;
    for (let element of this.simplifiedArrayToSerachIn) {
      if (this.checkIfPatternFound(currentIndex)) {
        let temp = this.foundIndexMemory;
        this.foundIndexMemory = [];
        this.nrOfFoundInRow = 0;
        return temp;
      } 
      currentIndex++;
    }
    return [];
  }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]):SlicedPatternDescriptor{
    this.clearThisInstanceMemory();
    this.simplifiedArrayToSerachIn = boardSlice;
    this.nrOfElementsInRowToWin = nrOfElementsInRowToWin;
    this.figure = figure;
    let foundPatternIndexes = this.getFoundPatternIndexes();
    let foundElementCords = foundPatternIndexes
    let nextMoveProposals = this.getListOfIndexesOfProposedMoves(foundPatternIndexes)
    console.log(`%cPattern output: `, 'background-color: black; color: white; padding: 5px; border-radius: 4px')
    console.log(foundElementCords)
    console.log(nextMoveProposals)
    return {
      foundElements: foundElementCords,
      nextMoveProposals: nextMoveProposals,
    }
  }


}



