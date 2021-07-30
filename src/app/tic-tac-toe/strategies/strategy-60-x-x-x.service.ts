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

let parametersFor_60_X_X_XService = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 2,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  canThereBeASearchedFigureAfterOfBeforePattern: true,
  nrOfMissingFigures: 2,
  nrOfAdditionalSymbols_exceedingNrInRowToWin: 0
}

@Parametrize(parametersFor_60_X_X_XService)
  export class Strategy60_X_X_XService extends GeneralStrategyService implements StrategyImplementator {

}