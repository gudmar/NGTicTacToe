import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css']
})
export class GameControlsComponent implements OnInit {

  @Output() restartEvent: EventEmitter<null> = new EventEmitter();
  @Output() boardSizeChanged: EventEmitter<string> = new EventEmitter();
  gameSizes: string[] = ['Board: 3x3 3 in row', 'Board: 5x5 5 in row', 'Board 10x10 5 in row']
  constructor() { 
  }

  ngOnInit(): void {
  }

  restartOnClick(){
    this.restartEvent.emit();
  }

  passEventToParent(data:any){
    this.boardSizeChanged.emit(data)
  }

}
