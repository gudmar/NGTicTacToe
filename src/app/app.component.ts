import { Component, Injectable, TemplateRef} from '@angular/core';
import {Receiver} from './app.types'
import { bindCallback } from 'rxjs';
import { MediatorService } from './shared/mediator.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicTacToe';
  boardSize: number = 3;
  nrOfRows = this.boardSize;  // for simplisity and pleability let board be a square
  nrOfColumns = this.boardSize;
  nrOfFiguresInRowToWinn = 3;
  mediator = new MediatorService();
  
  constructor(){
    
  }

  restartTicTacToeComponent(){
    this.mediator.sendMessageToAllSubscribers('resetTicTacToe')
  }

  changeBoardSize(data:any){
    switch(data){
      case 'Board: 3x3 3 in row': 
          this.boardSize = 3; 
          this.nrOfFiguresInRowToWinn=3; 
          break;
      case 'Board: 5x5 5 in row': 
          this.boardSize = 5; 
          this.nrOfFiguresInRowToWinn=5; 
          break;
      case 'Board 10x10 5 in row': 
          this.boardSize = 10; 
          this.nrOfFiguresInRowToWinn=5; 
          break;
      default: throw new Error('Now, how that happened? There was a different board size choosen than in menu?')
    }
  }

}

// 'Board: 3x3 3 in row', 'Board: 5x5 5 in row', 'Board 10x10 5 in row'