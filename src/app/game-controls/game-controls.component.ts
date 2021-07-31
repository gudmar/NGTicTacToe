import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css']
})
export class GameControlsComponent implements OnInit {

  @Output() restartEvent: EventEmitter<null> = new EventEmitter();
  @Output() boardSizeChanged: EventEmitter<string> = new EventEmitter();
  @Output() toggleOponent: EventEmitter<null> = new EventEmitter();
  gameSizes: string[] = ['Board: 3x3 3 in row', 'Board: 7x7 5 in row', 'Board 10x10 5 in row', 'Board: 12x12 5 in row']
  oponents: string[] = ['&#128187;', `&#x1F6B9;`]
  constructor() { 
  }

  ngOnInit(): void {
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
