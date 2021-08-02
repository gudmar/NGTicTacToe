import { Component, Injectable, EventEmitter, TemplateRef ,Input, Output, HostListener} from '@angular/core';
import { BoardHandlerServiceService } from './board-handler-service.service'
import { GetDataFromInintialStateService } from '../get-data-from-inintial-state.service'

import { Receiver, GameDescriptor, FigureNotEmpty, Oponent } from '../app.types'
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
  _humansFigure: FigureNotEmpty = "Circle";
  computersFigure: FigureNotEmpty = "Cross";
  oponent: Oponent = "Computer";
  set humansFigure(val: FigureNotEmpty) {
    this._humansFigure = val; 
    this.computersFigure = this._humansFigure == "Circle" ? "Cross" : "Circle";
  } 
  get humansFigure() {return this._humansFigure}

  isGameOver: boolean = false;
  nextFigure: FigureNotEmpty = "Circle"

  @Input() initialState: any;


  // @Input() set humansFigure(val: FigureNotEmpty){
  //   this.boardHandler.changeFigureOwners(val)
  // }
  
  @Input() set boardSize(val:number) {
    // this.boardHandler.parametrize(val, this.nrOfFiguresInRowToWinn, this.initialState)
    this.boardHandler.setBoardSize(val); //, this.nrOfFiguresInRowToWinn)
    this._boardSize = val;
    this.rowIds = this.createArrayOfNElements(this.boardSize);
    this.colIds = this.createArrayOfNElements(this.boardSize);  
    this.boardHandler.restartGame()
    // debugger;
  }
  get boardSize() {return this._boardSize}

  @Input() set nrOfFiguresInRowToWinn(val:number){
    // this.boardHandler.parametrize(this.boardSize, val, this.initialState)
    this.boardHandler.setNrOfFiguresNeededToWinn(val)
    this._nrOfFiguresInRowToWinn = val;
    this.boardHandler.restartGame()
  }

  @Output() nextFigureChanged: EventEmitter<FigureNotEmpty> = new EventEmitter();

  // subscribeToFigureChange(nextFigure: FigureNotEmpty){
  //   this.nextFigureChanged.emit(nextFigure)
  // }

  ngOnInit(){
    this.initialize();
    // this.subscribeToFigureChange(<FigureNotEmpty>this.boardHandler.nextFigure)
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
    // this.boardHandler.subscribeToFigureChange(this.subscribeToFigureChange.bind(this))
  }


  initialize(){
    let initialDataGetter = new GetDataFromInintialStateService();
    initialDataGetter.data = this.initialState;
    let initialGameData: GameDescriptor = initialDataGetter.initialGameData;
    this.setBoardSize_propagate(initialGameData.boardSize)
    this.setNrOfFiguresNeededToWinn_propagate(initialGameData.nrOfFiguresInRowToWinn)
    this.setNextFigure_propagate(initialDataGetter.nextFigure)
    this.setHumanFigureAndComputerFigure_propagate(initialDataGetter.humansFigure)
    this.boardHandler.setCommunicationFunction(this.onCommandFromBoardHandler.bind(this))
  }

  onCommandFromBoardHandler(command: string, data: any){
    if (command == "nextFigure") {
      this.nextFigure = data;
      this.nextFigureChanged.emit(data);
    }
  }

  setNrOfFiguresNeededToWinn_propagate(val: number) {
    this.nrOfFiguresInRowToWinn = val; this.boardHandler.setNrOfFiguresNeededToWinn(val)
  }
  setNextFigure_propagate(val: FigureNotEmpty) {
    this.nextFigure = val; this.boardHandler.setNextFigure(val);
  }
  setBoardSize_propagate(val: number) {
    this.boardSize = val; this.boardHandler.setBoardSize(val);
  }
  setOponent_propagate(val: Oponent) {
    let isComputerOponent = val == "Computer" ? true : false
    this.oponent = val; this.boardHandler.setIsComputerOponent(isComputerOponent)
  }
  setHumanFigureAndComputerFigure_propagate(humanFigure: FigureNotEmpty) {
    this.humansFigure = humanFigure; this.boardHandler.setHumansFigure(humanFigure);
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
    if (message == "toggleOponent") {
      this.boardHandler.toggleOponent()
    }
  }
}

