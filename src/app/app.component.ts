import { Component, Injectable, TemplateRef } from '@angular/core';
import { bindCallback } from 'rxjs';
// import { BoardHandlerServiceService } from './board-handler-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicTacToe';
  boardSize = 5;
  nrOfRows = this.boardSize;  // for simplisity and pleability let board be a square
  nrOfColumns = this.boardSize;
  nrOfFiguresInRowToWinn = 3;

  constructor(){
  }


}

