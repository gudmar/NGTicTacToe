import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';


@Injectable({
  providedIn: 'root'
})
export class Strategy1_00_00Service implements StrategyImplementator {
  simplifiedArrayToSerachIn: string[] = [];
  foundIndexMemory: number[] = [];
  nrOfFoundInRow: number = 0;
  maxNrOfFoundInRowSoFar: number = 0;
  maxNrOfFoundInRowIndexMemory:number[] = []
  nrOfElementsInRowToWin:number = 0;
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

  checkIfPatternFound(simplifiedElementIndex:number):boolean{
    return false;
  }

  isThereAMovePossible(foundPatternIndexes: number[]): boolean{
    return false
  }

  getListOfIndexesOfProposedMoves(foundPatternIndexes: number[]):number[]{
    return [];
  }

  isFieldEmptyAndInBoundries(queredFieldIndex: number):boolean{
    return false
  }

  isAWinnerPattern(lastFoundIndexOfPatter: number): boolean{
    return false;
  }

  getFoundPatternIndexes(): number[]{
    return []
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
