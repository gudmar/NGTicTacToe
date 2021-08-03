import { Injectable } from '@angular/core';
import { StrategyFindFirstPatternService } from './strategy-find-first-pattern.service';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { PlaceForWinerSearcherService } from './place-for-winer-searcher.service';
import { PatternDescriptor } from '../../app.types'
import { ThisReceiver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class CanGameBeWonByAnyoneService {
  firstPatternFinder: StrategyFindFirstPatternService;
  context: BoardHandlerServiceService;
  constructor(context:BoardHandlerServiceService) {
    this.firstPatternFinder = new StrategyFindFirstPatternService(context);
    this.context = context;
  }

  checkIfGameCanStillBeWonByAnyone(){
    return this.getFirstWinningPatternCords().nextMoveProposals.length > 0 ? true : false;
  }

  getFirstWinningPatternCords(){
    let patternFinder = PlaceForWinerSearcherService;
    let patternForCircle = this.firstPatternFinder.getCordinanceOfFirstFoundPattern("Circle", patternFinder.bind(this, this.context))
    let patternForCross = this.firstPatternFinder.getCordinanceOfFirstFoundPattern("Cross", patternFinder.bind(this, this.context))
    if (patternForCircle.nextMoveProposals.length > 0) return patternForCircle;
    return patternForCross;
  }

  getEmptyPattern():PatternDescriptor{
    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
