import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor, CellDescriptor, StrategyParameters } from '../../app.types.d'
import { StrategyFindFirstPatternService } from './strategy-find-first-pattern.service'
import { StrategyFindMaxFigureOccurencesService } from './strategy-find-max-figure-occurences.service'
import { Strategy00000Service } from './strategy-0--0000-.service'
import { Strategy1_00_00Service } from './strategy1-00-00.service'
import { Strategy_20_XX_XX_Service} from './strategy-20-xx-xx.service'
import { GeneralStrategyService } from './general-strategy.service'
import { StrategyEmptyBoardMoveSearcher,SingleRowEmptyBoardSearcher } from './strategy-empty-board.service'
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
                       SingleRowEmptyBoardSearcher;


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService;
  AVConverter: BoardSimplifierService;
  firstPatternFinder: StrategyFindFirstPatternService;
  maxFigureOccurencesFinder: StrategyFindMaxFigureOccurencesService;
  moveProposalInEmptyBoardFinder: StrategyEmptyBoardMoveSearcher;
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new BoardSimplifierService();
    this.firstPatternFinder = new StrategyFindFirstPatternService(context);
    this.maxFigureOccurencesFinder = new StrategyFindMaxFigureOccurencesService(context);
    this.moveProposalInEmptyBoardFinder = new StrategyEmptyBoardMoveSearcher(context)
  }

  getCalculatedStrategy(figure:FigureNotEmpty, patternSearchingClass: { new(): PatternSearcher }){

    @SetNrOfFiguresNeededToWinn(5)
    class StratgyLastMostInRowEnoughPlace_nrToWinnInjected extends StratgyLastMostInRowEnoughPlace{
    }

    let nrOfFiguresNeededToWinn = this.context.nrOfFiguresNeededToWinn;
    if (patternSearchingClass == StratgyLastMostInRowEnoughPlace) {
      return this.maxFigureOccurencesFinder.getCordinanceOfPatternWithMaximumNrOfFigures(figure, StratgyLastMostInRowEnoughPlace_nrToWinnInjected)
    }

    if (patternSearchingClass == SingleRowEmptyBoardSearcher){
      return this.moveProposalInEmptyBoardFinder.getMoveProposalsForEmptyBoard(figure)
      // return this.getCordinanceForEmptyBoard(figure, StrategyEmptyBoardService)
    }
    return this.firstPatternFinder.getCordinanceOfFirstFoundPattern(figure, patternSearchingClass)
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
