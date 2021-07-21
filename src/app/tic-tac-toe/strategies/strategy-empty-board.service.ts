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
