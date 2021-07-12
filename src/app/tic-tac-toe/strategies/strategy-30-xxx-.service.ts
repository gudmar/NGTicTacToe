import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor, Figure, CellDescriptor } from '../../app.types.d'
import { BoardHandlerServiceService } from '../board-handler-service.service';

@Injectable({
  providedIn: 'root'
})
export class Strategy2XXXService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number,  boardSlice: string[]):PatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
