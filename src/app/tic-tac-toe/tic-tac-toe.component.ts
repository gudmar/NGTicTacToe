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
  _boardSize:number = 0;
  _nrOfFiguresInRowToWinn = 3;
  @Input() set boardSize(val:number) {
    this.boardHandler.parametrize(val, this.nrOfFiguresInRowToWinn)
    this._boardSize = val;
    this.rowIds = this.createArrayOfNElements(this.boardSize);
    this.colIds = this.createArrayOfNElements(this.boardSize);
    this.boardHandler.restartGame()
  }
  get boardSize() {return this._boardSize}

  @Input() set nrOfFiguresInRowToWinn(val:number){
    this.boardHandler.parametrize(this.boardSize, val)
    this._nrOfFiguresInRowToWinn = val;
    this.boardHandler.restartGame()
  }

  get nrOfFiguresInRowToWinn(){
    return this._nrOfFiguresInRowToWinn;
  }
  rowIds:number[]=[];
  colIds:number[]=[];

  @Input() set mediator(mediatorService:MediatorService){
    mediatorService.subscribe(this.onMessageFromMediator.bind(this))
  }
  

  constructor(public boardHandler: BoardHandlerServiceService){
    this.boardHandler = boardHandler;
    this.boardSize = 3;
    this.boardHandler.parametrize(this.boardSize, this.nrOfFiguresInRowToWinn);
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

