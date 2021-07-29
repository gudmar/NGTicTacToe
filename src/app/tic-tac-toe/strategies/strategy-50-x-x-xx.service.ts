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

let parametersFor_50_X_X_XXService = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 2,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfMissingFigures: 2,
  nrOfAdditionalSymbols_exceedingNrInRowToWin: 0
}

@Parametrize(parametersFor_50_X_X_XXService)
  export class Strategy50_X_X_XXService extends GeneralStrategyService implements StrategyImplementator {

}

