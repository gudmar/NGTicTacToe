import { Injectable } from '@angular/core';
import { TestCase, Figure, CellCords, CellDescriptor, FigureNotEmpty } from '../../app.types'
import { BoardHandlerServiceService } from '../../tic-tac-toe/board-handler-service.service'


@Injectable({
  providedIn: 'root'
})
export class ArrayToBoardTranslatorService {

  boardHandler: BoardHandlerServiceService;

  constructor(boardHandler: BoardHandlerServiceService) {
    this.boardHandler = new BoardHandlerServiceService();
  }


}

let testCase1:TestCase = {
  name: 'some test',
  input: [[0, 0, 1, 2, 0],
          [0, 0, 1, 2, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]],
  expectedOutput: [[3, 1], [3, 2], [3, 3]]
}

// export interface CellDescriptor{
//     figure: Figure,
//     id: number,
//     row: number,
//     column: number,
//     isPartOfWinningPlot: boolean,
//     isOccupied: boolean,
//     onclick: () => void
//   }

