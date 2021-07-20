import { Injectable } from '@angular/core';
import { FigureNotEmpty, 
  PatternDescriptor, 
  CellDescriptor, 
  Figure, 
  SlicedPatternDescriptor, 
  StrategyImplementator, 
  StrategyParameters 
 } from '../../app.types.d'

@Injectable({
  providedIn: 'root'
})
export class StrategyEmptyBoardService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number, boardSlice: string[]): PatternDescriptor{
    return this.getEmptyPattern()
  }

  getEmptyPattern():PatternDescriptor{
    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }


}
