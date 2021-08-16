import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { FigureNotEmpty, GameDescriptor, Oponent } from '../app.types';
import { MediatorService } from '../shared/mediator.service'
import { GetDataFromInintialStateService } from '../get-data-from-inintial-state.service'
import { AboutInformationProviderService} from '../aboutInformation/about-information-provider.service'

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css'],
  providers: [AboutInformationProviderService]
})
export class GameControlsComponent implements OnInit {
  isAboutModalVisible = false;
  @Input() initialState: any;
  @Input() set mediator(mediatorService:MediatorService){
    mediatorService.subscribe(this.onMessageFromMediator.bind(this))
  }

  @Output() restartEvent: EventEmitter<null> = new EventEmitter();
  @Output() boardSizeChanged: EventEmitter<string> = new EventEmitter();
  @Output() toggleOponent: EventEmitter<null> = new EventEmitter();
  @Output() playersFigureChanged: EventEmitter<string> = new EventEmitter();


  @Input() nrOfFiguresInRowToWinn: number = 0;
  _nextFigure: FigureNotEmpty = "Cross";
  @Input() set nextFigure(val: FigureNotEmpty) {
    this._nextFigure = val;
  }
  get nextFigure() {
    return this._nextFigure
  };
  @Input() humansFigure: FigureNotEmpty = "Circle";
  // @Input() supportedGames: GameDescriptor[] = [{name:'', nrOfFiguresInRowToWinn: 0, boardSize: 0}]
  @Input() set supportedGames(val: string[]) {this.gameSizes = val}
  @Input() oponent: Oponent = "Computer";
  @Input() initialGame: string = '';
  @Input() gameCannotBeWon: boolean = false;

  nextFigureDisplay: string = '';
  gameSizes: string[] = ['Board: 3x3 3 in row', 'Board: 7x7 5 in row', 'Board 10x10 5 in row', 'Board: 12x12 5 in row']
  oponents: string[] = ['&#128187;', `&#x1F6B9;`]
  figureSymbols: string[] = ['&#9675;', '&times;']
  constructor() { 
  }

  getAboutInformation(){
    let informationProvider = new AboutInformationProviderService();
    return informationProvider.getContent();
  }

  setAboutModalToVisible() {
    setTimeout(()=>{this.isAboutModalVisible = true;})
    // debugger;
  }
  setAboutModalToNotVisible(){
    setTimeout(()=>{this.isAboutModalVisible = false;})
  }

  onMessageFromMediator(message: string){
    if (message == "resetTicTacToe"){

    }
  }

  ngOnInit(): void {
    // debugger;
  }

  currentOponentToSymbol(){
    return this.oponent == "Computer" ? '&#128187;' : `&#x1F6B9;`
  }

  playerFigureChanged(chosenFigure: any){
    let newPlayersFigure: string = chosenFigure == '&times;' ? "Cross" : "Circle"
    this.playersFigureChanged.emit(newPlayersFigure)
  }

  restartOnClick(){
    this.restartEvent.emit();
  }

  boardSettingsChanged(data:any){
    this.boardSizeChanged.emit(data)
  }

  opponentToggled(){
    this.toggleOponent.emit();
  }


}
