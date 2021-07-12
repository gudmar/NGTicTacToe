import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor } from '../../app.types.d'
import { BoardHandlerServiceService } from '../board-handler-service.service';

@Injectable({
  providedIn: 'root'
})
export class Strategy3000SomeInRowService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, nrOfElementsInRowToWin: number,  boardSlice: string[]):PatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
