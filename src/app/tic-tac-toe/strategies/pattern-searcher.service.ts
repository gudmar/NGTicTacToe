import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor, CellDescriptor, StrategyParameters } from '../../app.types.d'
import { StrategyFindFirstPatternService } from './strategy-find-first-pattern.service'
import { StrategyFindMaxFigureOccurencesService } from './strategy-find-max-figure-occurences.service'
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
import { BoardSimplifierService } from './board-simplifier.service';


type PatternSearcher = Strategy00000Service | 
                       Strategy1_00_00Service | 
                       Strategy_3__XX_X_Service | 
                       GeneralStrategyService | 
                       StratgyLastMostInRowEnoughPlace |
                       StrategyEmptyBoardService;


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService;
  AVConverter: BoardSimplifierService;
  firstPatternFinder: StrategyFindFirstPatternService;
  maxFigureOccurencesFinder: StrategyFindMaxFigureOccurencesService;
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new BoardSimplifierService();
    this.firstPatternFinder = new StrategyFindFirstPatternService(context);
    this.maxFigureOccurencesFinder = new StrategyFindMaxFigureOccurencesService(context);
  }

  getCalculatedStrategy(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){

    @SetNrOfFiguresNeededToWinn(5)
    class StratgyLastMostInRowEnoughPlace_nrToWinnInjected extends StratgyLastMostInRowEnoughPlace{
    }

    let nrOfFiguresNeededToWinn = this.context.nrOfFiguresNeededToWinn;
    if (patternSearchingClass == StratgyLastMostInRowEnoughPlace) {
      return this.maxFigureOccurencesFinder.getCordinanceOfPatternWithMaximumNrOfFigures(figure, StratgyLastMostInRowEnoughPlace_nrToWinnInjected)
      // return this.getCordinanceOfPatternWithMaximumNrOfFigures(figure, StratgyLastMostInRowEnoughPlace_nrToWinnInjected)
    }

    if (patternSearchingClass == StrategyEmptyBoardService){
      return this.getCordinanceForEmptyBoard(figure, StrategyEmptyBoardService)
    }
    return this.firstPatternFinder.getCordinanceOfFirstFoundPattern(figure, patternSearchingClass)
    // return this.getCordinanceOfPattern(figure, patternSearchingClass)
  }


  getCordinanceForEmptyBoard(figure:FigureNotEmpty,  patternSearchingClass: { new(): PatternSearcher }){
    let that = this;
    let nrOfOwnFigures = 0;
    let nrOfOponentFigures = 0;
    let patternFinder = new patternSearchingClass()
    let getSingleRowCord = function(iteration:number, rowNr:number){
      return [iteration + 1, rowNr]
    }
    let getRowCords = function(rowNr: number, boardSize: number){
      let cords = [];
      for (let iter = 0; iter < boardSize; iter++){
        cords.push(getSingleRowCord(iter, rowNr))
      }
      return cords
    }
    let countFigures = function(figure: FigureNotEmpty, patternFinder: PatternSearcher){
      let nrOfRows = that.context.boardSize;
      for (let row = 1; row <= nrOfRows; row++){
        let boardSlice = that.AVConverter.cords2simpleArray(that.context.board, getRowCords(row, that.context.boardSize))
        let {ownFigures, oponentFigures} = patternFinder.getPattern(figure, 0, boardSlice)
        nrOfOponentFigures = nrOfOponentFigures + oponentFigures;
        nrOfOwnFigures = nrOfOwnFigures + ownFigures;
      }
    }
    let getMiddleOfBoardIndex = function(boardSize: number){
      return Math.ceil(boardSize / 2);
    }
    let getMiddleOfBoardResult = function(){
      let middleOfBoardIndex = getMiddleOfBoardIndex(that.context.boardSize)
      return {
        foundElements: [],
        nextMoveProposals: [[middleOfBoardIndex, middleOfBoardIndex]]
      }
    }
    let getLeftBottomDiagonalResult = function() {
      let middleOfBoardResult = getMiddleOfBoardResult();
      middleOfBoardResult.nextMoveProposals[0][0] = middleOfBoardResult.nextMoveProposals[0][0] - 1;
      middleOfBoardResult.nextMoveProposals[0][1] = middleOfBoardResult.nextMoveProposals[0][1] - 1;
      return middleOfBoardResult;
    }

    let checkIfMiddleBoardFieldIsFree = function(patternFinder: PatternSearcher){
      let cords = getRowCords(getMiddleOfBoardIndex(that.context.boardSize), that.context.boardSize)
      let boardSlice = that.AVConverter.cords2simpleArray(
        that.context.board, 
        cords
      )
      let {isMiddlePositionFree} = patternFinder.getPattern(figure, 0, boardSlice)
      return isMiddlePositionFree;
    }
    countFigures(figure, patternFinder);
    let isMiddleBoardFieldFree = checkIfMiddleBoardFieldIsFree(patternFinder);
    if (nrOfOwnFigures > 0) return this.getEmptyPattern();
    if (nrOfOponentFigures > 1) return this.getEmptyPattern();    
    if (isMiddleBoardFieldFree) return getMiddleOfBoardResult();
    
    return getLeftBottomDiagonalResult();
  }
  
  
  // doesCordBelongToBoard(cord: CellCords) {
  //   let xCord = <number>cord[0];
  //   let yCord = <number>cord[1];
  //   if (xCord < 1) return false;
  //   if (xCord > this.context.boardSize) return false;
  //   if (yCord < 1) return false;
  //   if (yCord > this.context.boardSize) return false;
  //   return true;
  // }

  getEmptyPattern():PatternDescriptor{
    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
