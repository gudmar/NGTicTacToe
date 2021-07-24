import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_0_Strat_0000_ = {
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: true,
  shouldBeforePatternFieldBeEmpty: true,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfSearchedFigures: 3
}

@Parametrize(parametersFor_0_Strat_0000_)
  export class Strategy_3__XX_X_Service extends GeneralStrategyService implements StrategyImplementator {
}
