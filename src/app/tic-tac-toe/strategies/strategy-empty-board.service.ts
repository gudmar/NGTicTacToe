import { Injectable } from '@angular/core';
import {
  FigureNotEmpty,
  PatternDescriptor,
  CellDescriptor,
  Figure,
  SlicedPatternDescriptor,
  StrategyImplementator,
  StrategyParameters
} from '../../app.types.d'
import { StrategyToolkitService } from './strategy-toolkit.service';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import {BoardSimplifierService} from './board-simplifier.service'

type PatternSearcher = any;

@Injectable({
  providedIn: 'root'
})
export class StrategyEmptyBoardMoveSearcher extends StrategyToolkitService{

  nrOfOwnFigures = 0;
  nrOfOponentFigures = 0;
  patternFinder = new SingleRowEmptyBoardSearcher()

  constructor(context: BoardHandlerServiceService){
    super(context);
    this.context = context;
    this.AVConverter = new BoardSimplifierService();

  }

  getMoveProposalsForEmptyBoard(ownFigure: FigureNotEmpty){
    this.countFigures(ownFigure)
    let isMiddleBoardFieldFree = this.checkIfMiddleBoardFieldIsFree(ownFigure);
    if (this.nrOfOwnFigures > 0) return this.getEmptyPattern();
    if (this.nrOfOponentFigures > 1) return this.getEmptyPattern();    
    if (isMiddleBoardFieldFree) return this.getMiddleOfBoardResult();

    return this.getLeftBottomDiagonalResult();  
  }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]):PatternDescriptor{
    return this.getMoveProposalsForEmptyBoard(figure)
  }


  getSingleRowCord(iteration:number, rowNr:number){
    return [iteration + 1, rowNr]
  }

  getRowCords(rowNr: number, boardSize: number){
    let cords = [];
    for (let iter = 0; iter < boardSize; iter++){
      cords.push(this.getSingleRowCord(iter, rowNr))
    }
    return cords
  }

  countFigures(figure: FigureNotEmpty){
    let nrOfRows = this.context.boardSize;
    for (let row = 1; row <= nrOfRows; row++){
      let boardSlice = this.AVConverter.cords2simpleArray(this.context.board, this.getRowCords(row, this.context.boardSize))
      let {ownFigures, oponentFigures} = this.patternFinder.getPattern(figure, 0, boardSlice)
      this.nrOfOponentFigures = this.nrOfOponentFigures + oponentFigures;
      this.nrOfOwnFigures = this.nrOfOwnFigures + ownFigures;
    }
  }
  getMiddleOfBoardIndex(boardSize: number){
    return Math.ceil(boardSize / 2);
  }

  getMiddleOfBoardResult(){
    let middleOfBoardIndex = this.getMiddleOfBoardIndex(this.context.boardSize)
    return {
      foundElements: [],
      nextMoveProposals: [[middleOfBoardIndex, middleOfBoardIndex]]
    }
  }
  getLeftBottomDiagonalResult(){
    let middleOfBoardResult = this.getMiddleOfBoardResult();
    middleOfBoardResult.nextMoveProposals[0][0] = middleOfBoardResult.nextMoveProposals[0][0] - 1;
    middleOfBoardResult.nextMoveProposals[0][1] = middleOfBoardResult.nextMoveProposals[0][1] - 1;
    return middleOfBoardResult;
  }

  checkIfMiddleBoardFieldIsFree(ownFigure: FigureNotEmpty){
    let cords = this.getRowCords(this.getMiddleOfBoardIndex(this.context.boardSize), this.context.boardSize)
    let boardSlice = this.AVConverter.cords2simpleArray(
      this.context.board, 
      cords
    )
    let {isMiddlePositionFree} = this.patternFinder.getPattern(ownFigure, 0, boardSlice)
    return isMiddlePositionFree;
  }

}


@Injectable({
  providedIn: 'root'
})
export class SingleRowEmptyBoardSearcher {

  constructor() { }

  countOwnFigures(figure: FigureNotEmpty,boardSlice: string[]) {
    return this.countFigures(figure, boardSlice)
  }

  countOponentFigures(figure: FigureNotEmpty, boardSlice: string[]) {
    return this.countFigures(<FigureNotEmpty>this.opositeFigure(figure), boardSlice)
  }

  countFigures(figure: FigureNotEmpty, boardSlice: string[]) {
    let nrOfFigures = 0;
    let figureCounter = function (item: string, index: number) {
      if (item == figure) nrOfFigures++
    }
    boardSlice.forEach(figureCounter);
    return nrOfFigures;
  }

  isMiddlePositionOfSliceFree(boardSlice: string[]){
    let middleIndex = Math.ceil(boardSlice.length / 2) - 1;
    return boardSlice[middleIndex] == "" ? true : false;
  }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]): any{
    return {
      ownFigures: this.countOwnFigures(figure, boardSlice),
      oponentFigures: this.countOponentFigures(figure, boardSlice),
      isMiddlePositionFree: this.isMiddlePositionOfSliceFree(boardSlice)
    }
  }

  opositeFigure(figure: Figure) {
    if (figure == "Circle") return "Cross";
    if (figure == "Cross") return "Circle";
    return "";
  }
}
