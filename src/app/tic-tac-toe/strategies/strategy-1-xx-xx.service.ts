import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, Figure, CellDescriptor } from '../../app.types.d'
import { BoardHandlerServiceService } from '../board-handler-service.service';

@Injectable({
  providedIn: 'root'
})
export class Strategy1XX_XXService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, boardHandler: BoardHandlerServiceService, cordsToSearchPatternIn: number[][]):PatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
