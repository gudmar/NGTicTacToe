import { Injectable } from '@angular/core';
import { FigureNotEmpty, PatternDescriptor } from '../../app.types.d'

@Injectable({
  providedIn: 'root'
})
export class Strategy4NoneInRowService {

  constructor() { }

  getPattern(figure: FigureNotEmpty, cords: number[][]):PatternDescriptor{

    return {
      foundElements: [],
      nextMoveProposals: [],
    }
  }
}
