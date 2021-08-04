import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellCords } from '../../app.types'
import { BoardSimplifierService } from './board-simplifier.service'
import { BoardHandlerServiceService } from '../board-handler-service.service'

type PatternSearcher = any;

@Injectable({
  providedIn: 'root'
})
export abstract class StrategyToolkitService {
  context:BoardHandlerServiceService;
  AVConverter: BoardSimplifierService;
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new BoardSimplifierService();
  }

  checkLeftTopDiagonalForPattern(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    let getCordFunction= function(iteration: number){
      return {
        xCord: iteration + diagonalStartColumn,
        yCord: iteration + 1
      }
    }
    return this.checkDirectionForPattern(figure, patternFinder, getCordFunction)
  }

  checkLeftBottomDiagonalForPattern(figure:FigureNotEmpty, patternFinder: PatternSearcher, diagonalStartColumn: number){
    let getCordFunction= function(iteration: number){
      return {
        xCord: diagonalStartColumn - iteration,
        yCord: iteration + 1
      }
    }
    return this.checkDirectionForPattern(figure, patternFinder, getCordFunction)
  }

  checkDirectionForPattern(figure: FigureNotEmpty, patternFinder: PatternSearcher, getCordFunction: Function){
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let {xCord, yCord} = getCordFunction(i)
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

  getPatternOutOfSingleRow(figure:FigureNotEmpty, patternFinder: PatternSearcher, rowNr:number){
    let getCordFunction= function(iteration: number){
      return {
        xCord: iteration + 1,
        yCord: rowNr
      }
    }
      return this.checkDirectionForPattern(figure, patternFinder, getCordFunction)
  }

  getPatternOutOfSingleColumn(figure:FigureNotEmpty, patternFinder: PatternSearcher, colNr:number){
    let getCordFunction= function(iteration: number){
      return {
        xCord: colNr,
        yCord: iteration + 1
      }
    }
      return this.checkDirectionForPattern(figure, patternFinder, getCordFunction)
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
