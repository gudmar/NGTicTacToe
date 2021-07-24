import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, CellDescriptor, Figure, SlicedPatternDescriptor, StrategyImplementator, StrategyParameters } from '../../app.types.d'
import { sign } from 'crypto';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { GeneralStrategyService, Parametrize  } from './general-strategy.service'

let parametersFor_1_Strat_00_00_ = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  canThereBeASearchedFigureAfterOfBeforePattern: true,
  nrOfSearchedFigures: 4
}

@Parametrize(parametersFor_1_Strat_00_00_)
  export class Strategy1_00_00Service extends GeneralStrategyService implements StrategyImplementator {
}

