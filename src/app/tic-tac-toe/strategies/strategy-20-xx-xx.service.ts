import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_20_Strat_XX_XX_ = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfSearchedFigures: 4
}

@Parametrize(parametersFor_20_Strat_XX_XX_)
  export class Strategy_20_XX_XX_Service extends GeneralStrategyService implements StrategyImplementator {
}

