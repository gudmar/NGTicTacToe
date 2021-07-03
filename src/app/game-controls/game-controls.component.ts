import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css']
})
export class GameControlsComponent implements OnInit {

  @Output() restartEvent: EventEmitter<null> = new EventEmitter();

  constructor() { 
  }

  ngOnInit(): void {
  }

  restartOnClick(){
    this.restartEvent.emit();
  }

}
