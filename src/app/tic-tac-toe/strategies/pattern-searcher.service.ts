import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor, CellDescriptor, StrategyParameters } from '../../app.types.d'
import { Strategy00000Service } from './strategy-0--0000-.service'
import { Strategy1_00_00Service } from './strategy1-00-00.service'
import { Strategy1XX_XXService} from './strategy-20-xx-xx.service'
import { GeneralStrategyService } from './general-strategy.service'
// import { Strategy2XXXService } from "./strategy-30-xxx-.service";
import {Strategy_3__XX_X_Service} from "./strategy-3--xx-x-.service"
import { ConcatSource } from 'webpack-sources';
import { ThrowStmt, ThisReceiver } from '@angular/compiler';

import {Strategy3} from './general-strategy.service.spec'


type PatternSearcher = Strategy00000Service | Strategy1_00_00Service | Strategy_3__XX_X_Service | GeneralStrategyService | Strategy3;

class ArrayVectorConverter {

  constructor(){}

  cords2simpleArray(boardDescriptor: CellDescriptor[], cordsToSearchPatternIn:number[][]) : string[]{
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


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService
  AVConverter: ArrayVectorConverter;
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new ArrayVectorConverter();
  }

  getCalculatedStrategy(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    return this.getCordinanceOfPattern(figure, patternSearchingClass)
  }

  getCordinanceOfPattern(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    let patternFinder = new patternSearchingClass();
    let patternInAllRows = this.checkAllRowsForPattern(figure, patternFinder);
    let patternInAllColumns = this.checkAllColsForPattern(figure, patternFinder);
    // let patternInAllRows = this.checkAllRowsForPattern(figure, patternFinder);

    let patternInAllLeftTopDiagonals = this.checkAllLeftTopDiagonalsForPattern(figure, patternFinder);
    let patternInAllLeftBottomDiagonals = this.checkAllLeftBottomDiagonalsForPattern(figure, patternFinder)
  
    // console.log(patternInAllColumns);
    // console.log(patternInAllLeftBottomDiagonals)
    // console.log(patternInAllLeftTopDiagonals)
    if (patternInAllRows.foundElements.length > 0) return patternInAllRows;
    if (patternInAllColumns.foundElements.length > 0) return patternInAllColumns;
    if (patternInAllLeftTopDiagonals.foundElements.length > 0) return patternInAllLeftTopDiagonals;
    if (patternInAllLeftBottomDiagonals.foundElements.length > 0) return patternInAllLeftBottomDiagonals;
    return this.getEmptyPattern();
  }


  checkAllRowsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    for (let _row = 1; _row <= this.context.nrOfRows; _row++){
      let calculatedPattern = this.getPatternOutOfSingleRow(figure, patternFinder, _row)
      if (calculatedPattern.foundElements.length > 0) {
        // coalcuatedPattern will return foundElements == [] if finds no match. Always !!!
        return calculatedPattern;
      }
    }
    // return this.getPatternOutOfSingleRow("Circle", patternFinder, 1)
    return this.getEmptyPattern();
  }


  checkAllColsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
      for (let col = 1; col <= this.context.nrOfColumns; col++){
        let calculatedPattern = this.getPatternOutOfSingleColumn(figure, patternFinder, col);
        if (calculatedPattern.foundElements.length > 0) return calculatedPattern;
      }
      // return this.getPatternOutOfSingleColumn("Circle", patternFinder, 1);
      return this.getEmptyPattern();
    }


  checkAllLeftTopDiagonalsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher) {
    let firstDiagonalOffset = - this.context.boardSize + 2;
    let lastDiagonalOffset = this.context.boardSize;
    for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
      let calculatedPattern = this.checkLeftTopDiagonalForPattern(figure, patternFinder, diagonalNr);
      if (calculatedPattern.foundElements.length > 0) return calculatedPattern
    }
    return this.getEmptyPattern();
  }

  checkAllLeftBottomDiagonalsForPattern(figure: FigureNotEmpty,  patternFinder: PatternSearcher) {
    let firstDiagonalOffset = 1;
    let lastDiagonalOffset = this.context.boardSize * 2 - 1; // number of all diagonals in square;
    for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
      let calculatedPattern = this.checkLeftTopDiagonalForWinner(figure, patternFinder, diagonalNr);
      if (calculatedPattern.foundElements.length > 0) return calculatedPattern;
    }
    return this.getEmptyPattern();
  }

  getPatternOutOfSingleRow(figure:FigureNotEmpty, patternFinder: PatternSearcher, rowNr:number){
    let cords = [];
    for(let i = 0; i < this.context.nrOfColumns; i++){
      cords.push([ i + 1, rowNr])
    }
    return this.findPatternInCords(cords, patternFinder, figure)
  }

  getPatternOutOfSingleColumn(figure:FigureNotEmpty, patternFinder: PatternSearcher, colNr:number){
    let cords = [];
    for(let i = 0; i < this.context.nrOfRows; i++){
      cords.push([colNr, i + 1])
    }
    return this.findPatternInCords(cords, patternFinder, figure)
  }


  checkLeftTopDiagonalForPattern(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    // Left Top diagonal starts in left top board corner
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let xCord = i + diagonalStartColumn;
      let yCord = i + 1;
      if (this.doesCordBelongToBoard([xCord, yCord])) {
        cords.push([xCord, yCord]);
      }
    }
    return this.findPatternInCords(cords, patternFinder, figure)
  }

  checkLeftTopDiagonalForWinner(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    // Left Bottom diagonal starts in left bottom board corner
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let xCord = diagonalStartColumn - i;
      let yCord = i + 1;
      if (this.doesCordBelongToBoard([xCord, yCord])) {
        cords.push([xCord, yCord]);
      }
    }
    return this.findPatternInCords(cords, patternFinder, figure)
  }

  findPatternInCords(cords: number[][], patternFinder: PatternSearcher, figure: FigureNotEmpty){
    let vectorizedArray: string[] = this.AVConverter.cords2simpleArray(this.context.board, cords);

    let solution = patternFinder.getPattern(figure, this.context.nrOfFiguresNeededToWinn, vectorizedArray);
    return {
      foundElements: this.AVConverter.simpleArrayIndex2Cords(<number[]>solution.foundElements, cords),
      nextMoveProposals: this.AVConverter.simpleArrayIndex2Cords(<number[]>solution.nextMoveProposals, cords)
    }
  }

  doesCordBelongToBoard(cord: CellCords) {
    let xCord = <number>cord[0];
    let yCord = <number>cord[1];
    if (xCord < 1) return false;
    if (xCord > this.context.boardSize) return false;
    if (yCord < 1) return false;
    if (yCord > this.context.boardSize) return false;
    return true;
  }

  getEmptyPattern():PatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }

}
