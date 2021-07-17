import { Injectable, NgModule } from '@angular/core';
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
export class StratgyLastMostInRowEnoughPlace {
  numberOfEmptyFieldsFound: number = 0;
  numberOfFiguresFound: number = 0;
  listOfFigureIndexes: number[] = [];
  listOfProposedMoves: number[] = [];
  listOfEmptyFields: number[] = [];

  numberOfFiguresInRowNeededToWin: number = 0;
  constructor() { }

  getPattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[]):SlicedPatternDescriptor{

    return this.getSinglePattern(figure, nrOfFiguresNeededToWin, sliceOfBoardArray, 0);
  }

  getSinglePattern(figure: FigureNotEmpty, nrOfFiguresNeededToWin: number, sliceOfBoardArray: string[], startFromIndex: number = 0):SlicedPatternDescriptor{

    return this.getEmptyPattern();
  }
  

  getEmptyPattern():SlicedPatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}

