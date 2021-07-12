// strategy-0 means that 0 - highest prio to react
// _0000_ means that nrOfWin computer symbols are in row and are surrounded by empty elements
// In this case at least one empty is needed
// XX_XX means that 2 oponent symbols are one by one, one pause and 2 next oponent symbols are grupped

import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

interface Cords {
  rowNr: number,
  colNr: number
}

@Injectable({
  providedIn: 'root'
})
export class Strategy00000Service {

  constructor() { }

  getPattern(figure: FigureNotEmpty, boardHandler: BoardHandlerServiceService, cordsToSearchPatternIn: number[][]):PatternDescriptor{
    let simplifiedArrayToSerachIn = this.cords2simpleArray(boardHandler.board, cordsToSearchPatternIn);
    let foundIndexMemory: number[] = [];
    let nrOfFoundInRow = 0;
    let maxNrOfFoundInRowSoFar = 0;
    let maxNrOfFoundInRowIndexMemory = [];
    let nrOfElementsInRowToWin = boardHandler.nrOfFiguresNeededToWinn;

    let isFieldEmptyAndInBoundries = function(queredFieldIndex: number):boolean{
      if (queredFieldIndex < 0) return false;
      if (queredFieldIndex >= simplifiedArrayToSerachIn.length) return false;
      if (simplifiedArrayToSerachIn[queredFieldIndex] != '') return false;
      return true;
    }

    let getListOfIndexesOfProposedMoves = function(foundPatternIndexes: number[]){
      let patternIndexes = foundPatternIndexes;
      
      let indexBeforePattern = Math.min(...foundPatternIndexes) - 1;
      let indexAfterPattern = Math.max(...foundPatternIndexes) + 1;
      let output = [];
      let shouldAddAfter = isFieldEmptyAndInBoundries(indexAfterPattern);
      let shouldAddBefore = isFieldEmptyAndInBoundries(indexBeforePattern)
      if (isFieldEmptyAndInBoundries(indexAfterPattern)) output.push(indexAfterPattern);
      if (isFieldEmptyAndInBoundries(indexBeforePattern)) output.push(indexBeforePattern)
      return output;
    }

    let isThereAMovePossible = function(foundPatternIndexes: number[]){
      return getListOfIndexesOfProposedMoves(foundPatternIndexes).length > 0 ? true : false;
    }

    let isAWinnerPattern = function(lastFoundIndexOfPatter: number): boolean{
      let nextIndex = lastFoundIndexOfPatter + 1;
      if (nextIndex >= simplifiedArrayToSerachIn.length) return false;
      return simplifiedArrayToSerachIn[nextIndex] == figure ? true : false;
    }

    let checkIfPatternFound = function(simplifiedElementIndex:number){
      if (simplifiedArrayToSerachIn[simplifiedElementIndex] == figure) {
        foundIndexMemory.push(simplifiedElementIndex);
        nrOfFoundInRow++;
      } else {
        foundIndexMemory = [];
        nrOfFoundInRow = 0;  
      }

      if (nrOfFoundInRow == nrOfElementsInRowToWin - 1){
        if (isAWinnerPattern(simplifiedElementIndex)) return false;
        if (!isThereAMovePossible(foundIndexMemory)) return false;
        return true
      }
      return false
    }

    let getFoundPatternIndexes = function(){
      let currentIndex = 0;
      for (let element of simplifiedArrayToSerachIn) {
        if (checkIfPatternFound(currentIndex)) {
          let temp = foundIndexMemory;
          foundIndexMemory = [];
          nrOfFoundInRow = 0;
          return temp;
        } 
        currentIndex++;
      }
      return [];
    }
    let foundPatternIndexes = getFoundPatternIndexes();
    let foundElementCords = this.simpleArrayIndex2Cords(foundPatternIndexes, cordsToSearchPatternIn)
    let nextMoveProposals = this.simpleArrayIndex2Cords(getListOfIndexesOfProposedMoves(foundPatternIndexes), cordsToSearchPatternIn)
    console.log(`%cPattern output: `, 'background-color: black; color: white; padding: 5px; border-radius: 4px')
    console.log(foundElementCords)
    console.log(nextMoveProposals)
    // if (nextMoveProposals.length == 0) return this.getEmptyPattern();
    return {
      foundElements: foundElementCords,
      nextMoveProposals: nextMoveProposals,
    }
  }

  getEmptyPattern(){
    return {
      foundElements: [],
      nextMoveProposals: []
    }
  }

  cords2simpleArray(boardDescriptor: CellDescriptor[], cordsToSearchPatternIn:number[][]) : String[]{
    let that = this;
    return cordsToSearchPatternIn.map((element:number[], index:number) => {
      return boardDescriptor[that.Cords2Index(element, boardDescriptor)].figure
    })
  }

  simpleArrayIndex2Cords(simpleArrayIndexes: number[], cordsToSearchPatternIn: number[][]){
    return simpleArrayIndexes.map((singleIndexElement) => {
      return cordsToSearchPatternIn[singleIndexElement]
    })
  }

  getBoardSize(boardDescriptor: CellDescriptor[]): number{
    return Math.sqrt(boardDescriptor.length)
  }

  index2Cords(index: number, boardDescriptor: CellDescriptor[]):number[]{
    let boardSize = this.getBoardSize(boardDescriptor);
    let rows: number = Math.floor(index / boardSize) + 1;
    let cols: number = index % boardSize + 1;
    return [cols, rows]
  }

  Cords2Index(cords: number[], boardDescriptor: CellDescriptor[]){
    let rowNr:number = cords[1];
    let colNr:number = cords[0];
    let boardSize = this.getBoardSize(boardDescriptor)
    return (rowNr - 1) * boardSize + (colNr - 1)
  }
}

// export interface CellDescriptor{
//   figure: Figure,
//   id: number,
//   row: number,
//   column: number,
//   isPartOfWinningPlot: boolean,
//   isOccupied: boolean,
//   onclick: () => void
// }
