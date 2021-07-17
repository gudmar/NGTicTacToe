import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_1_Strat_00_00_ = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  canThereBeASearchedFigureAfterOfBeforePattern: true,
  nrOfSearchedFigures: 4
}

@Parametrize(parametersFor_1_Strat_00_00_)
  export class Strategy1_00_00Service extends GeneralStrategyService implements StrategyImplementator {
}


// @Injectable({
//   providedIn: 'root'
// })
// export class Strategy1_00_00Service implements StrategyImplementator {
//   simplifiedArrayToSerachIn: string[] = [];
//   foundIndexMemory: number[] = [];
//   nrOfFoundInRow: number = 0;
//   maxNrOfFoundInRowSoFar: number = 0;
//   maxNrOfFoundInRowIndexMemory:number[] = []
//   nrOfElementsInRowToWin:number = 0;
//   figure: FigureNotEmpty = 'Circle';
//   nrOfGaps: number = 0;
//   gapIndex: number = -1;
//   constructor() {}
  
//   clearThisInstanceMemory() {
//     this.simplifiedArrayToSerachIn = [];
//     this.foundIndexMemory = [];
//     this.nrOfFoundInRow = 0;
//     this.maxNrOfFoundInRowSoFar = 0;
//     this.maxNrOfFoundInRowIndexMemory = [];    
//     this.nrOfElementsInRowToWin = 0;
//     this.figure = 'Circle';
//     this.nrOfGaps = 0;
//     this.gapIndex = -1;
//   }

//   handleMemoryForSingleFigureIndex(elementIndex:number):void{
//     switch(this.simplifiedArrayToSerachIn[elementIndex]){
//       case this.figure: {
//         this.addIndexToMemory(elementIndex);
//         break;
//       };
//       case this.opositeFigure(this.figure): {
//         this.resetMemory()
//         break;
//       };
//       case "": {
//         if (this.nrOfFoundInRow == 0) return undefined;
//         if (this.nrOfGaps > 1) this.resetMemory();
//         this.nrOfGaps++;
//         this.gapIndex = elementIndex;
//       }
//     }    
//   }

//   checkIfPatternFound(simplifiedElementIndex:number):boolean{
//     let test = this.simplifiedArrayToSerachIn[simplifiedElementIndex]
//     switch(this.simplifiedArrayToSerachIn[simplifiedElementIndex]){
//       case this.figure: {
//         if ((this.nrOfFoundInRow == this.nrOfElementsInRowToWin - 1) && (this.nrOfGaps == 1)) {
//           return true;
//         }
//         if ((this.nrOfFoundInRow >= this.nrOfElementsInRowToWin - 1) && (this.nrOfGaps < 1)) {
//           return false;
//         }
//         if (this.nrOfFoundInRow > this.nrOfElementsInRowToWin - 1) {
//           return false;
//         }
//         // as this is already the other pattern implementation (0Strategy)
//         break;
//       };
//       case this.opositeFigure(this.figure): {
//         break;
//       };
//       case "": {
//         if (this.nrOfFoundInRow == 0) return false;
//         if (this.nrOfGaps > 1) return false;
//       }
//     }
//     return false;
//   }


//   addIndexToMemory(index: number){
//     this.nrOfFoundInRow = this.nrOfFoundInRow + 1
//     this.foundIndexMemory.push(index);

//   }

//   resetMemory(){
//     this.foundIndexMemory = [];
//     this.nrOfFoundInRow = 0;
//     this.nrOfGaps = 0;
//   }

//   opositeFigure(figure: Figure){
//     if (figure == "Circle") return "Cross";
//     if (figure == "Cross")  return "Circle";
//     return "";
//   }

//   isThereAMovePossible(foundPatternIndexes: number[]): boolean{
//     // Not needed really
//     return false
//   }

//   getListOfIndexesOfProposedMoves(foundPatternIndexes: number[]):number[]{
//     return [this.gapIndex];
//   }

//   isFieldEmptyAndInBoundries(queredFieldIndex: number):boolean{
//     if (queredFieldIndex < 0) return false;
//     if (queredFieldIndex >= this.simplifiedArrayToSerachIn.length) return false;
//     if (this.simplifiedArrayToSerachIn[queredFieldIndex] != '') return false;
//     return true;
//   }

//   isAWinnerPattern(lastFoundIndexOfPatter: number): boolean{
//     return false; // in this case gap is needed, so will never be a winner pattern
//   }

//   getFoundPatternIndexes(): number[]{
//     let currentIndex = 0;
//     for (let element of this.simplifiedArrayToSerachIn) {
//       this.handleMemoryForSingleFigureIndex(currentIndex)
//       if (this.checkIfPatternFound(currentIndex)) {
//         let temp = this.foundIndexMemory;
//         this.resetMemory
//         return temp;
//       } 
//       currentIndex++;
//     }
//     return [];
//   }


//     getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]):SlicedPatternDescriptor{
//     this.clearThisInstanceMemory();
//     this.simplifiedArrayToSerachIn = boardSlice;
//     this.nrOfElementsInRowToWin = nrOfElementsInRowToWin;
//     this.figure = figure;
//     let foundPatternIndexes = this.getFoundPatternIndexes();
//     let foundElementCords = foundPatternIndexes
//     let nextMoveProposals = this.getListOfIndexesOfProposedMoves(foundPatternIndexes)
//     // console.log(`%cPattern output: `, 'background-color: black; color: white; padding: 5px; border-radius: 4px')
//     // console.log(foundElementCords)
//     // console.log(nextMoveProposals)
//     return {
//       foundElements: foundElementCords,
//       nextMoveProposals: nextMoveProposals,
//     }
//   }
// }
