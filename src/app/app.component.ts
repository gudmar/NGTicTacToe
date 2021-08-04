import { Component, Injectable, TemplateRef, HostListener} from '@angular/core';
import { Receiver, InitialState, GameDescriptor, Oponent } from './app.types'
import { bindCallback } from 'rxjs';
import { MediatorService } from './shared/mediator.service'
import { FigureNotEmpty } from './app.types'
import { GetDataFromInintialStateService } from './get-data-from-inintial-state.service'
import { WindowSizeEvaluatorService } from './shared/window-size-evaluator.service'


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
        nrOfFiguresInRowToWinn: 3,
        supportedScreanSizes: ['verySmall', 'small', 'medium', 'big'],
      },
      {
        name: 'Board: 7x7 5 in row',
        boardSize: 7,
        nrOfFiguresInRowToWinn: 5,
        supportedScreanSizes: ['small', 'medium', 'big'],
      },
      {
        name: 'Board 10x10 5 in row',
        boardSize: 10,
        nrOfFiguresInRowToWinn: 5,
        supportedScreanSizes: ['medium', 'big'],
      },
      {
        name: 'Board: 12x12 5 in row',
        boardSize: 12,
        nrOfFiguresInRowToWinn: 5,
        supportedScreanSizes: ['big'],
      }

    ],
    initialGameName: 'Board: 3x3 3 in row'
  }
  initialDataGetter = new GetDataFromInintialStateService();
  title = 'TicTacToe';
  boardSize: number = 3;
  nrOfFiguresInRowToWinn = 3;
  mediator = new MediatorService();
  nextFigure: FigureNotEmpty = this.initialState.nextFigure;
  gameCannotBeWon: boolean = false;
  humansFigure: FigureNotEmpty = this.initialState.humansFigure;
  computersFigure: FigureNotEmpty = this.getOpositeFigure(this.humansFigure);
  get supportedGames(): string[]{ 
    let currentDisplaySize = this.windowSize;
    let isGameSupported = function(game: GameDescriptor, index: number){
      let isDisplaySizeSupported = game.supportedScreanSizes!.findIndex((el) => {return currentDisplaySize == el});
      return isDisplaySizeSupported == -1 ? false : true;
    }
    let supportedGameDescirptors = this.initialState.supportedGames.filter(isGameSupported)
    return supportedGameDescirptors.map((el: GameDescriptor) => {return el.name})
    // [{name: '', boardSize: 0, nrOfFiguresInRowToWinn :0}]
  }
  initialGame: string = this.initialState.initialGameName;
  oponent: Oponent = "Computer";
  windowSizeEvaluator: WindowSizeEvaluatorService = new WindowSizeEvaluatorService();
  set dispalyWidth(val: number) {this.windowSizeEvaluator.displayWidth = val;}
  set displayHeight(val: number) {this.windowSizeEvaluator.displayHeight = val;}
  get displayWidth():number {return this.windowSizeEvaluator.displayWidth;}
  get displayHeight():number {return this.windowSizeEvaluator.displayHeight;}
  get windowSize():string {return this.windowSizeEvaluator.getScreanSize()}

  
  constructor(){
    
  }

  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
    this.dispalyWidth = event.target.innerWidth;
    this.displayHeight = event.target.innerHeight;
    console.log(this.windowSizeEvaluator.getScreanSize())
  }


  ngOnInit(){
    this.changeBoardSize(this.initialGame)
  }

  setGameCannotBeWonFlag(flagValue:boolean){
    setTimeout(() => {this.gameCannotBeWon = flagValue});
  }

  getOpositeOponent(oponent: Oponent) { return oponent== "Computer" ? "Human" : "Computer"}

  getOpositeFigure(figure: FigureNotEmpty) {
    return figure == "Circle" ? "Cross" : "Circle"
  }

  nextFigureChange(nextFigure: FigureNotEmpty){
    setTimeout(()=>{this.nextFigure = nextFigure;});
    // debugger;
    console.log(`APP component: Next figure changed to ${this.nextFigure}`)
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
    this.oponent = this.oponent == "Computer" ? "Human" : "Computer"
  }
  // toggleOponent(){
  //   this.mediator.sendMessageToAllSubscribers('toggleOponent')
  // }

}

// 'Board: 3x3 3 in row', 'Board: 5x5 5 in row', 'Board 10x10 5 in row'