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

@Injectable({
  providedIn: 'root'
})
export class StrategyEmptyBoardService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]): SlicedPatternDescriptor{
  //   let ownFigures = this.getFigureIndexes(figure, boardSlice);
  //   let oponentFigures = this.getFigureIndexes(<FigureNotEmpty>this.opositeFigure(figure), boardSlice)
  //   if (ownFigures.length > 0) return this.getEmptyPattern();
  //   if (oponentFigures.length > 1) return this.getEmptyPattern();
  //   if (oponentFigures.length == 0) return this.getNextMoveProposal(boardSlice);
  //   if (oponentFigures.length == 1) return this.getNextMoveProposals(boardSlice);
  // return this.getEmptyPattern()
  return {
    foundElements: [],
    nextMoveProposals: [],
  }
  }

  getPatternForEmptyBoard(figure: FigureNotEmpty, boardModel: string[]): PatternDescriptor {
    let boardSize = this.getBoardSize(boardModel);
    let opositeFigure = function (figure: FigureNotEmpty) { return figure == "Circle" ? "Cross" : "Circle" }
    let nrOfOwnFigureCounter = function () {
      let output = 0;
      for (let item of boardModel) {
        if (figure == item) output++;
      }
      return output;
    }
    let nrOfOponentFigureCounter = function () {
      let output = 0;
      for (let item of boardModel) {
        if (opositeFigure(figure) == item) output++;
      }
      return output;
    }.bind(this)
    if (nrOfOwnFigureCounter() > 0) return this.getEmptyPattern();
    if (nrOfOponentFigureCounter() > 1) return this.getEmptyPattern();
    if (this.isMiddlePositionFree(boardModel)) {
      return {
        foundElements: [],
        nextMoveProposals: [[Math.floor(boardSize / 2), Math.floor(boardSize / 2)]],
      }
    }
    return {
      foundElements: [],
      nextMoveProposals: [[Math.floor(boardSize / 2) - 1, Math.floor(boardSize / 2) + 1]],    
    }
  }

  isMiddlePositionFree(boardModel: string[]) {
    let boardSize = this.getBoardSize(boardModel);
    let midX = Math.floor(boardSize / 2);
    let midY = midX;
    if (boardModel[this.xy2Index(midX, midY, boardSize)] == "") return true;
    return false;
  }

  getBoardSize(boardModel: string[]) {
    return Math.sqrt(boardModel.length + 1)
  }

  xy2Index(x: number, y: number, boardSize: number) {
    return boardSize * y + x - 1;
  }

  xFromIndex(index: number, boardSize: number): number {
    return (index + 1) % boardSize;
  }

  yFromIndex(index: number, boardSize: number): number {
    return Math.floor((index + 1) / boardSize);
  }





  // getNextMoveProposal(boardSlice: string[]):SlicedPatternDescriptor{
  //   return {
  //     foundElements: [],
  //     nextMoveProposals: [Math.floor((boardSlice.length + 1) / 2)]
  //   }
  // }

  // getNextMoveProposals(boardSlice: string[]):SlicedPatternDescriptor{
  //   let getMiddleOfBoardIndex = Math.floor((boardSlice.length + 1) / 2);
  //   return {
  //     foundElements: [],
  //     nextMoveProposals: [getMiddleOfBoardIndex - 1, getMiddleOfBoardIndex + 1]
  //   }
  // }

  // getFigureIndexes(figure: FigureNotEmpty, boardSlice: string[]){
  //   let figureIndexes: number[] = [];
  //   let callback = function(element: string, index: number){
  //     if (element == figure) figureIndexes.push(index);
  //   }
  //   boardSlice.forEach(callback)
  //   return figureIndexes
  // }

  countOwnFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]) {
    return this.countFigures(figure, boardDescriptor)
  }

  countOponentFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]) {
    return this.countFigures(<FigureNotEmpty>this.opositeFigure(figure), boardDescriptor)
  }

  countFigures(figure: FigureNotEmpty, boardDescriptor: CellDescriptor[]) {
    let nrOfFigures = 0;
    let figureCounter = function (item: CellDescriptor, index: number) {
      if (item.figure == figure) nrOfFigures++
    }
    boardDescriptor.forEach(figureCounter);
    return nrOfFigures;
  }

  getEmptyPattern(): PatternDescriptor {
    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }

  opositeFigure(figure: Figure) {
    if (figure == "Circle") return "Cross";
    if (figure == "Cross") return "Circle";
    return "";
  }


}
