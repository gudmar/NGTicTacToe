import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from '../board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure, PatternDescriptor, CellDescriptor, StrategyParameters } from '../../app.types.d'
import { StrategyFindFirstPatternService } from './strategy-find-first-pattern.service'
import { StrategyFindMaxFigureOccurencesService } from './strategy-find-max-figure-occurences.service'
import { Strategy00000Service } from './strategy-0--0000-.service'
import { Strategy1_00_00Service } from './strategy1-00-00.service'
import { Strategy_20_XX_XX_Service} from './strategy-20-xx-xx.service'
import { Strategy_30_Strat__XXX_Service } from './strategy-30-xxx-.service'
import { GeneralStrategyService } from './general-strategy.service'
import { StrategyEmptyBoardMoveSearcher,SingleRowEmptyBoardSearcher } from './strategy-empty-board.service'
import {StratgyLastMostInRowEnoughPlace, SetNrOfFiguresNeededToWinn} from './stratgy-last-most-in-row-enough-place.service';
import { StrategyMaxNumberOfFreeFieldsService } from './strategy-max-number-of-free-fields.service'
import {Strategy_3__XX_X_Service} from "./strategy-3--xx-x-.service"
import { ConcatSource } from 'webpack-sources';
import { ThrowStmt, ThisReceiver } from '@angular/compiler';

import { fileURLToPath } from 'url';
import { start } from 'repl';
import { BoardSimplifierService } from './board-simplifier.service';


type PatternSearcher = Strategy00000Service | 
                       Strategy1_00_00Service | 
                       Strategy_3__XX_X_Service | 
                       GeneralStrategyService | 
                       StratgyLastMostInRowEnoughPlace |
                       SingleRowEmptyBoardSearcher | 
                       StrategyMaxNumberOfFreeFieldsService;


@Injectable({
  providedIn: 'root'
})
export class PatternSearcherService {
  context:BoardHandlerServiceService;
  AVConverter: BoardSimplifierService;
  firstPatternFinder: StrategyFindFirstPatternService;
  maxFigureOccurencesFinder: StrategyFindMaxFigureOccurencesService;
  moveProposalInEmptyBoardFinder: StrategyEmptyBoardMoveSearcher;
  commands: {[propname: string] : any} = {
    'strategy:0000': Strategy00000Service,
    'strategy:00-00': Strategy1_00_00Service,
    'strategy:-XX-X-': Strategy_3__XX_X_Service,
    'strategy:-XX-XX': Strategy_20_XX_XX_Service,
    'strategy:-XXX-': Strategy_30_Strat__XXX_Service,
    'strategy:empty': StrategyEmptyBoardMoveSearcher,
    'strategy:last': StratgyLastMostInRowEnoughPlace,
    'strategy:empty-area': StrategyMaxNumberOfFreeFieldsService
  }
  
  constructor(context:BoardHandlerServiceService){
    this.context = context;
    this.AVConverter = new BoardSimplifierService();
    this.firstPatternFinder = new StrategyFindFirstPatternService(context);
    this.maxFigureOccurencesFinder = new StrategyFindMaxFigureOccurencesService(context);
    this.moveProposalInEmptyBoardFinder = new StrategyEmptyBoardMoveSearcher(context)
  }

  getNextMoveCords(ownFigure: FigureNotEmpty = "Cross", ):number[]{
    let oponentFigure: FigureNotEmpty = ownFigure == "Circle" ? "Cross" : "Circle";
    let strategiesInOrder = [
      {command: 'strategy:0000', figure: ownFigure},
      {command: 'strategy:00-00', figure: ownFigure},
      {command: 'strategy:0000', figure: oponentFigure},
      {command: 'strategy:-XX-XX', figure: oponentFigure},
      {command: 'strategy:-XX-X-', figure: oponentFigure},
      {command: 'strategy:-XXX-', figure: oponentFigure},
      {command: 'strategy:last', figure: ownFigure},
      {command: 'strategy:empty', figure: ownFigure},
      {command: 'strategy:empty-area', figure: ownFigure},
    ]
    for (let strategy of strategiesInOrder){
      let proposedMoves = this.getCalculatedStrategy(strategy.figure, strategy.command).nextMoveProposals;
      if (proposedMoves.length > 0) {
        console.log(`Strategy: ${strategy.command} chosen.`)
        return this.randomlySelectCords(proposedMoves)
      }
    }
    return []; // This empty array means, that there is a widthdraw. No move at all is possible.
  }

  randomlySelectCords(listOfProposedMoves:number[][]): number[]{
    let nrOfProposedMoves: number = listOfProposedMoves.length;
    return listOfProposedMoves[PatternSearcherService.getRandomNumberFromInterval(0, nrOfProposedMoves)]
  }

  static getRandomNumberFromInterval(start: number, end: number){
    return Math.floor(Math.random() * (end - start)) + start;
  }

  commandToPatternTranslator(command: string){
    return this.commands[command]
  }

  getCalculatedStrategy(figure:FigureNotEmpty, command: string){
    let translatedClass = this.commandToPatternTranslator(command)
    let patternSearchingClass = translatedClass;

    @SetNrOfFiguresNeededToWinn(this.context.nrOfFiguresNeededToWinn)
    class StratgyLastMostInRowEnoughPlace_nrToWinnInjected extends StratgyLastMostInRowEnoughPlace{
    }
    let nrOfFiguresNeededToWinn = this.context.nrOfFiguresNeededToWinn;
    if (patternSearchingClass == StratgyLastMostInRowEnoughPlace ) {
      return this.maxFigureOccurencesFinder.getCordinanceOfPatternWithMaximumNrOfFigures(figure, StratgyLastMostInRowEnoughPlace_nrToWinnInjected)
    }
    if (patternSearchingClass == StrategyMaxNumberOfFreeFieldsService){
      return this.maxFigureOccurencesFinder.getCordinanceOfPatternWithMaximumNrOfFigures(figure, patternSearchingClass)
    }

    if (patternSearchingClass == StrategyEmptyBoardMoveSearcher){
      return this.moveProposalInEmptyBoardFinder.getMoveProposalsForEmptyBoard(figure)
    }
    return this.firstPatternFinder.getCordinanceOfFirstFoundPattern(figure, patternSearchingClass.bind(this, this.context))
  }

  getEmptyPattern():PatternDescriptor{
    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
