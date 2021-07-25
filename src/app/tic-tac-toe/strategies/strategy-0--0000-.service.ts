// strategy-0 means that 0 - highest prio to react
// _0000_ means that nrOfWin computer symbols are in row and are surrounded by empty elements
// In this case at least one empty is needed
// XX_XX means that 2 oponent symbols are one by one, one pause and 2 next oponent symbols are grupped

import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_0_Strat_0000_ = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 0,
  maxGapSize: 0,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: true,
  nrOfMissingFigures: 1
  // nrOfSearchedFigures: 4
}

@Parametrize(parametersFor_0_Strat_0000_)
  export class Strategy00000Service extends GeneralStrategyService implements StrategyImplementator {
}
