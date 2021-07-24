import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellCords } from '../../app.types'
import { StrategyToolkitService } from './strategy-toolkit.service'
import { BoardSimplifierService } from './board-simplifier.service'
import { BoardHandlerServiceService } from '../board-handler-service.service'

type PatternSearcher = any;

@Injectable({
  providedIn: 'root'
})
export class StrategyFindFirstPatternService extends StrategyToolkitService {
  
  constructor(context:BoardHandlerServiceService){
    super(context)
  }

  getCordinanceOfFirstFoundPattern(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){
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

}
