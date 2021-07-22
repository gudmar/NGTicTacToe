import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor } from '../../app.types'
import { StrategyToolkitService } from './strategy-toolkit.service';
import { BoardHandlerServiceService } from '../board-handler-service.service';

type PatternSearcher = any;

@Injectable({
  providedIn: 'root'
})
export class StrategyFindMaxFigureOccurencesService extends StrategyToolkitService {

  constructor(context: BoardHandlerServiceService) { 
    super(context)
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

}
