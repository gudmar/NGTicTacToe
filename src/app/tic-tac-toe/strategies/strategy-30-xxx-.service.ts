import { Injectable } from '@angular/core';
import { FigureNotEmpty, 
         PatternDescriptor, 
         CellDescriptor, 
         Figure, 
         SlicedPatternDescriptor, 
         StrategyImplementator, 
         StrategyParameters 
        } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_30_Strat__XXX_ = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 0,
  maxGapSize: 0,
  shouldAfterPatternFieldBeEmpty: true,
  shouldBeforePatternFieldBeEmpty: true,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfMissingFigures: 2
  // nrOfSearchedFigures: 3
}

@Parametrize(parametersFor_30_Strat__XXX_)
  export class Strategy_30_Strat__XXX_Service extends GeneralStrategyService implements StrategyImplementator {
}