import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor, CellDescriptor, StrategyParameters } from '../../app.types.d'
import { Strategy00000Service } from './strategy-0--0000-.service'
import { Strategy1_00_00Service } from './strategy1-00-00.service'
import { Strategy_20_XX_XX_Service} from './strategy-20-xx-xx.service'
import { GeneralStrategyService } from './general-strategy.service'
import { StrategyEmptyBoardService } from './strategy-empty-board.service'
import {StratgyLastMostInRowEnoughPlace, SetNrOfFiguresNeededToWinn} from './stratgy-last-most-in-row-enough-place.service'
// import { Strategy2XXXService } from "./strategy-30-xxx-.service";
import {Strategy_3__XX_X_Service} from "./strategy-3--xx-x-.service"
import { ConcatSource } from 'webpack-sources';
import { ThrowStmt, ThisReceiver } from '@angular/compiler';

import {Strategy3} from './general-strategy.service.spec'
import { fileURLToPath } from 'url';
import { start } from 'repl';


type PatternSearcher = Strategy00000Service | 
                       Strategy1_00_00Service | 
                       Strategy_3__XX_X_Service | 
                       GeneralStrategyService | 
                      //  Strategy3 |  
                       StratgyLastMostInRowEnoughPlace |
                       StrategyEmptyBoardService;

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

  toString(boardDescriptor: CellDescriptor[]):string[]{
    let output: string[] = [];
    boardDescriptor.forEach((value:CellDescriptor, index: number, arr: CellDescriptor[]) => {
      output.push(value.figure)
    })
    return output;
  }

  // countFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]){
  //   let nrOfFigures = 0;
  //   let figureCounter = function(item: CellDescriptor, index: number){
  //     if (item.figure == figure) nrOfFigures++
  //   }
  //   boardDescriptor.forEach(figureCounter);
  //   return nrOfFigures;
  // }
}


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService;
  AVConverter: ArrayVectorConverter;
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new ArrayVectorConverter();
  }

  getCalculatedStrategy(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){

    @SetNrOfFiguresNeededToWinn(5)
    class StratgyLastMostInRowEnoughPlace_nrToWinnInjected extends StratgyLastMostInRowEnoughPlace{
    }

    let nrOfFiguresNeededToWinn = this.context.nrOfFiguresNeededToWinn;
    if (patternSearchingClass == StratgyLastMostInRowEnoughPlace) {
      return this.getCordinanceOfPatternWithMaximumNrOfFigures(figure, StratgyLastMostInRowEnoughPlace_nrToWinnInjected)
    }

    if (patternSearchingClass == StrategyEmptyBoardService){
      return this.getCordinanceForEmptyBoard(figure, )
    }
    return this.getCordinanceOfPattern(figure, patternSearchingClass)
  }

  getCordinanceOfPattern(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    let patternFinder = new patternSearchingClass();
    let patternInAllRows = this.checkAllRowsForPattern(figure, patternFinder);
    let patternInAllColumns = this.checkAllColsForPattern(figure, patternFinder);
    let patternInAllLeftTopDiagonals = this.checkAllLeftTopDiagonalsForPattern(figure, patternFinder);
    let patternInAllLeftBottomDiagonals = this.checkAllLeftBottomDiagonalsForPattern(figure, patternFinder)
  
    if (patternInAllRows.foundElements.length > 0) return patternInAllRows;
    if (patternInAllColumns.foundElements.length > 0) return patternInAllColumns;
    if (patternInAllLeftTopDiagonals.foundElements.length > 0) return patternInAllLeftTopDiagonals;
    if (patternInAllLeftBottomDiagonals.foundElements.length > 0) return patternInAllLeftBottomDiagonals;
    return this.getEmptyPattern();
  }

  getCordinanceForEmptyBoard(figure:FigureNotEmpty){
    let emptyBoardSolutionSercher = new StrategyEmptyBoardService();
    let opositeFigure = function(figure: FigureNotEmpty) {
      if (figure == "Circle") return "Cross";
      return "Circle"
    }
    let nrOfOwnFigures = emptyBoardSolutionSercher.countOwnFigures(figure, this.context.board);
    let nrOfOponentFigures = emptyBoardSolutionSercher.countOponentFigures(figure, this.context.board);
    if (nrOfOwnFigures > 0) return this.getEmptyPattern();
    if (nrOfOponentFigures > 1) return this.getEmptyPattern();

    return emptyBoardSolutionSercher.getPatternForEmptyBoard(figure, this.AVConverter.toString(this.context.board));
  }
  
  getCordinanceOfPatternWithMaximumNrOfFigures(figure: FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    let that = this;
    let patternFinder = new patternSearchingClass();
    let rows = this.findMaxPatternInAllRows(figure, patternFinder);
    let cols = this.findMaxPatternInAllCols(figure, patternFinder);
    let leftTopDiagonal = this.findMaxPatternInAllTopLeftDiagonals(figure, patternFinder);
    let leftBottomDiagonal = this.findMaxPatternInAllBottomLeftDiagonals(figure, patternFinder);
    let getSolutionWithMostFigures = function(arrayOfSolutions: PatternDescriptor[]){
      let solutionWithMaxFigures = that.getEmptyPattern();
      let maxNrOfFigures = -1;
      for (let solution of arrayOfSolutions){
        let curentSolutionLenght = solution.foundElements.length;
        if (curentSolutionLenght > maxNrOfFigures) {
          solutionWithMaxFigures = solution;
          maxNrOfFigures = curentSolutionLenght;
        }
      }
      return solutionWithMaxFigures;
    }
    return getSolutionWithMostFigures([rows, cols, leftTopDiagonal, leftBottomDiagonal])
  }

  

  findMaxPatternInAllCols(figure: FigureNotEmpty, patternFinder: PatternSearcher){
    return this.findMaxPatternInColumnRowSlices(figure, patternFinder, this.getPatternOutOfSingleColumn.bind(this))
  }

  findMaxPatternInAllRows(figure: FigureNotEmpty, patternFinder: PatternSearcher){
    return this.findMaxPatternInColumnRowSlices(figure, patternFinder, this.getPatternOutOfSingleRow.bind(this))
  }


  findMaxPatternInAllTopLeftDiagonals(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    return this.findMaxPatternInDiagonalsGeneral(figure, 
      patternFinder, 
      this.checkLeftTopDiagonalForPattern.bind(this), 
      {
        firstDiagonalOffset: - this.context.boardSize + 2,
        lastDiagonalOffset: this.context.boardSize
      }
    )
  }

  findMaxPatternInAllBottomLeftDiagonals(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    return this.findMaxPatternInDiagonalsGeneral(figure, 
      patternFinder, 
      this.checkLeftBottomDiagonalForPattern.bind(this), 
      {
        firstDiagonalOffset: 1,
        lastDiagonalOffset: this.context.boardSize * 2 - 1
      }
    )
  }

  findMaxPatternInColumnRowSlices(figure: FigureNotEmpty, patternFinder:PatternSearcher, patternGetterFunction: Function) {
    let maxFiguresSollutionMemory = this.getEmptyPattern();
    for (let _row = 1; _row <= this.context.nrOfRows; _row++){
      let calculatedPattern = patternGetterFunction(figure, patternFinder, _row)
      if (calculatedPattern.foundElements.length > 0) {
        let nrOfFiguresInCurrentSolution = calculatedPattern.foundElements.length;
        let nrOfFiguresInBiggestColutionSoFar = maxFiguresSollutionMemory.foundElements.length;
        if (nrOfFiguresInBiggestColutionSoFar < nrOfFiguresInCurrentSolution) maxFiguresSollutionMemory = calculatedPattern;
      }
    }
    return maxFiguresSollutionMemory;
  }


  findMaxPatternInDiagonalsGeneral(
    figure: FigureNotEmpty, 
    patternFinder:PatternSearcher, 
    patternSlicerFunction: Function,
    diagonalOffset: {firstDiagonalOffset: number, lastDiagonalOffset: number},
  ){
    let maxFiguresSollutionMemory = this.getEmptyPattern();
    for (let diagonalNr = diagonalOffset.firstDiagonalOffset; diagonalNr <= diagonalOffset.lastDiagonalOffset; diagonalNr++){
      let nrOfFiguresInBiggestColutionSoFar = maxFiguresSollutionMemory.foundElements.length;
      let calculatedPattern = patternSlicerFunction(figure, patternFinder, diagonalNr);
      let nrOfFiguresInCurrentSolution = calculatedPattern.foundElements.length;
      if (nrOfFiguresInBiggestColutionSoFar < nrOfFiguresInCurrentSolution) maxFiguresSollutionMemory = calculatedPattern;
    }
    return maxFiguresSollutionMemory;
  }


  checkAllRowsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    return this.findPatternInColumnRowSlices(figure, patternFinder, this.getPatternOutOfSingleRow.bind(this))
  }

  checkAllColsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    return this.findPatternInColumnRowSlices(figure, patternFinder, this.getPatternOutOfSingleColumn.bind(this))
  }

  findPatternInColumnRowSlices(figure: FigureNotEmpty, patternFinder: PatternSearcher, patternSlicerFunction: Function){
    for (let sliceNr = 1; sliceNr <= this.context.nrOfColumns; sliceNr++){
      let calculatedPattern = patternSlicerFunction(figure, patternFinder, sliceNr);
      if (calculatedPattern.foundElements.length > 0) return calculatedPattern;
    }
    return this.getEmptyPattern();
  }

  checkAllLeftTopDiagonalsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher) {
    return this.checkDiagonalsForPattern(
      figure, patternFinder, this.checkLeftTopDiagonalForPattern.bind(this), 
      {firstDiagonalOffset: - this.context.boardSize + 2, lastDiagonalOffset:  this.context.boardSize})
  }

  checkAllLeftBottomDiagonalsForPattern(figure: FigureNotEmpty,  patternFinder: PatternSearcher) {
    return this.checkDiagonalsForPattern(
      figure, patternFinder, this.checkLeftBottomDiagonalForPattern.bind(this),
      {firstDiagonalOffset: 1, lastDiagonalOffset: this.context.boardSize * 2 - 1}
    )
  }

  checkDiagonalsForPattern(
    figure: FigureNotEmpty,  
    patternFinder: PatternSearcher,
    patternSlicerFunction: Function,
    diagonalOffset: {firstDiagonalOffset: number, lastDiagonalOffset: number},
  ){
    for (let diagonalNr = diagonalOffset.firstDiagonalOffset; diagonalNr <= diagonalOffset.lastDiagonalOffset; diagonalNr++){
      let calculatedPattern = patternSlicerFunction(figure, patternFinder, diagonalNr);
      if (calculatedPattern.foundElements.length > 0) return calculatedPattern;
    }
    return this.getEmptyPattern();
  }

  checkLeftTopDiagonalForPattern(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    let getCordFunction= function(iteration: number, startPosition: number){
      return {
        xCord: iteration + diagonalStartColumn,
        yCord: iteration + 1
      }
    }
    return this.checkDirectionForPattern(figure, patternFinder, diagonalStartColumn, getCordFunction)
  }

  checkLeftBottomDiagonalForPattern(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    let getCordFunction= function(iteration: number, startPosition: number){
      return {
        xCord: diagonalStartColumn - iteration,
        yCord: iteration + 1
      }
    }
    return this.checkDirectionForPattern(figure, patternFinder, diagonalStartColumn, getCordFunction)
  }


  getPatternOutOfSingleRow(figure:FigureNotEmpty, patternFinder: PatternSearcher, rowNr:number){
    let getCordFunction= function(iteration: number, startPosition: number){
      return {
        xCord: iteration + 1,
        yCord: rowNr
      }
    }
      return this.checkDirectionForPattern(figure, patternFinder, rowNr, getCordFunction)
  }

  getPatternOutOfSingleColumn(figure:FigureNotEmpty, patternFinder: PatternSearcher, colNr:number){
    let getCordFunction= function(iteration: number, startPosition: number){
      return {
        xCord: colNr,
        yCord: iteration + 1
      }
    }
      return this.checkDirectionForPattern(figure, patternFinder, colNr, getCordFunction)
  }

  checkDirectionForPattern(figure: FigureNotEmpty, patternFinder: PatternSearcher, startPosition: number, getCordFunction: Function){
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let {xCord, yCord} = getCordFunction(i, startPosition)
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
