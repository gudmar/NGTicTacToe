import { Component, Injectable, TemplateRef ,Input, Output, HostListener} from '@angular/core';
import { BoardHandlerServiceService } from './board-handler-service.service'
import { Receiver } from '../app.types'
import { MediatorService} from '../shared/mediator.service'


@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {
  title = 'TicTacToe';
  boardSize = 5;
  nrOfRows = this.boardSize;  // for simplisity and pleability let board be a square
  nrOfColumns = this.boardSize;
  nrOfFiguresInRowToWinn = 3;
  rowIds = this.createArrayOfNElements(this.boardSize);
  colIds = this.createArrayOfNElements(this.boardSize);
  @Input() set mediator(mediatorService:MediatorService){
    mediatorService.subscribe(this.onMessageFromMediator.bind(this))
  }
  

  constructor(public boardHandler: BoardHandlerServiceService){
    this.boardHandler = boardHandler;
    this.boardHandler.parametrize(this.boardSize, this.nrOfFiguresInRowToWinn);
  }

  restartTicTacToe() {
    window.alert('Restart signal reveived')
  }

  createArrayOfNElements(n:number){
    let output = [];
    for(let i = 1; i < n + 1; i++){ output.push(i) }
    return output;
  }

  onMessageFromMediator(message: string){
    if (message == "resetTicTacToe"){
      this.boardHandler.restartGame()
    }
  }
}

