import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor } from '../../app.types.d'
import { Strategy00000Service } from './strategy-0--0000-.service'
import { Strategy1XX_XXService} from './strategy-1-xx-xx.service'
import { Strategy2XXXService } from "./strategy-2-xxx-.service";


type PatternSearcher = Strategy00000Service | Strategy1XX_XXService | Strategy2XXXService;


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
  }

  getCalculatedStrategy(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    return this.getCordinanceOfPattern(figure, patternSearchingClass)
  }

  getCordinanceOfPattern(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
    let patternFinder = new patternSearchingClass();
    let patternInAllColumns = this.checkAllColsForPattern(figure, patternFinder);
    let patternInAllRows = this.checkAllRowsForPattern(figure, patternFinder);
    let patternInAllLeftTopDiagonals = this.checkAllLeftTopDiagonalsForPattern(figure, patternFinder);
    let patternInAllLeftBottomDiagonals = this.checkAllLeftBottomDiagonalsForPattern(figure, patternFinder)
    if (patternInAllRows.foundElements.length > 0) return patternInAllRows;
    if (patternInAllColumns.foundElements.length > 0) return patternInAllColumns;
    if (patternInAllLeftTopDiagonals.foundElements.length > 0) return patternInAllLeftTopDiagonals;
    if (patternInAllLeftBottomDiagonals.foundElements.length) return patternInAllLeftBottomDiagonals;
    return this.getEmptyPattern();
  }

  checkAllRowsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
    for (let row = 1; row <= this.context.nrOfRows; row++){
      let calculatedPattern = this.getPatternOutOfSingleRow(figure, patternFinder, row)
      console.log(`Winner list for row ${row} is ${JSON.stringify(calculatedPattern)}`)
      if (calculatedPattern.foundElements.length >= this.context.nrOfFiguresNeededToWinn) return calculatedPattern;
    }
    return this.getEmptyPattern();
  }


  checkAllColsForPattern(figure: FigureNotEmpty, patternFinder:PatternSearcher){
      for (let col = 1; col <= this.context.nrOfColumns; col++){
        let calculatedPattern = this.getPatternOutOfSingleColumn(figure, patternFinder, col);
        if (calculatedPattern.foundElements.length >= this.context.nrOfFiguresNeededToWinn) return calculatedPattern;
      }
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
    return patternFinder.getPattern(figure, cords)
  }

  getPatternOutOfSingleColumn(figure:FigureNotEmpty, patternFinder: PatternSearcher, colNr:number){
    let cords = [];
    for(let i = 0; i < this.context.nrOfRows; i++){
      cords.push([colNr, i + 1])
    }
    return patternFinder.getPattern(figure, cords)
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
    return patternFinder.getPattern(figure, cords)
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
    return patternFinder.getPattern(figure, cords)
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
