import { Component, Injectable, TemplateRef} from '@angular/core';
import { Receiver, InitialState } from './app.types'
import { bindCallback } from 'rxjs';
import { MediatorService } from './shared/mediator.service'
import { FigureNotEmpty } from './app.types'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialState: InitialState = {
    nextFigure: "Circle",
    humansFigure: "Circle",
    defaultOponent: "Computer",
    supportedGames:[
      {
        name: 'Board: 3x3 3 in row',
        boardSize: 3,
        nrOfFiguresInRowToWinn: 3
      },
      {
        name: 'Board: 7x7 5 in row',
        boardSize: 7,
        nrOfFiguresInRowToWinn: 5
      },
      {
        name: 'Board 10x10 5 in row',
        boardSize: 10,
        nrOfFiguresInRowToWinn: 5
      },
      {
        name: 'Board: 12x12 5 in row',
        boardSize: 12,
        nrOfFiguresInRowToWinn: 5
      }

    ],
    initialGameName: 'Board: 3x3 3 in row'
  }
  title = 'TicTacToe';
  boardSize: number = 3;
    nrOfFiguresInRowToWinn = 3;
  mediator = new MediatorService();
  nextFigure: FigureNotEmpty = this.initialState.nextFigure;
  humansFigure: FigureNotEmpty = this.initialState.humansFigure;
  
  constructor(){
    
  }

  nextFigureChange(nextFigure: FigureNotEmpty){
    this.nextFigure = nextFigure;
  }

  changeHumansFigure(newFigure: any){
    // debugger;
    this.humansFigure = <FigureNotEmpty>newFigure;
  }

  restartTicTacToeComponent(){
    this.mediator.sendMessageToAllSubscribers('resetTicTacToe')
    this.nextFigure = "Circle";
    this.nextFigure = "Circle";
  }

  changeBoardSize(data:any){
    switch(data){
      case 'Board: 3x3 3 in row': 
          this.boardSize = 3; 
          this.nrOfFiguresInRowToWinn=3; 
          break;
      case 'Board: 7x7 5 in row': 
          this.boardSize = 7;
          this.nrOfFiguresInRowToWinn=5; 
          break;
      case 'Board 10x10 5 in row': 
          this.boardSize = 10; 
          this.nrOfFiguresInRowToWinn=5; 
          break;
          
      case 'Board: 12x12 5 in row': 
          this.boardSize = 12; 
          this.nrOfFiguresInRowToWinn=5; 
          break;
      default: throw new Error('Now, how that happened? There was a different board size choosen than in menu?')
    }
  }

  toggleOponent(){
    this.mediator.sendMessageToAllSubscribers('toggleOponent')
  }

}

// 'Board: 3x3 3 in row', 'Board: 5x5 5 in row', 'Board 10x10 5 in row'