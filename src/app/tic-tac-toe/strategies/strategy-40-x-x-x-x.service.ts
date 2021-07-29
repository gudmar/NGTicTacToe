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

let parametersFor_40_Strat_X_X_X_X = {
  // nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 3,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfMissingFigures: 3,
  nrOfAdditionalSymbols_exceedingNrInRowToWin: 2
}

@Parametrize(parametersFor_40_Strat_X_X_X_X)
  export class Strategy40_X_X_X_X_Service extends GeneralStrategyService implements StrategyImplementator {
    getMiddleOfGapIndexes(){
      let compareFunction = function (a:number, b:number){
        if (a < b) return -1;
        if (a == b) return 0;
        return 1
      }
      let sortedGapIndexes = this.gapIndexes.sort(compareFunction);
      return sortedGapIndexes[Math.floor(sortedGapIndexes.length / 2)]
    }
    getListOfIndexesOfProposedMoves(foundPatternIndexes: number[]):number[]{
      if (this.gapIndexes.length == 0) {
        let beforeAfterPatternFreeFields = []
        if (this.isFieldAfterPatternFree()) beforeAfterPatternFreeFields.push(this.getLastPatternFieldIndex() + 1)
        if (this.isFieldBeforePatternFree()) beforeAfterPatternFreeFields.push(this.getFirstPatternFieldIndex() - 1)
        return beforeAfterPatternFreeFields;
      }
      return [this.getMiddleOfGapIndexes()];
    }
}
