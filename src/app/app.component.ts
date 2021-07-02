import { Component, Injectable, TemplateRef } from '@angular/core';
import { bindCallback } from 'rxjs';
import { BoardHandlerServiceService } from './board-handler-service.service'


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
  rowIds = this.createArrayOfNElements(this.boardSize);
  colIds = this.createArrayOfNElements(this.boardSize);

  constructor(public boardHandler: BoardHandlerServiceService){
    this.boardHandler = boardHandler;
    this.boardHandler.parametrize(this.boardSize, this.nrOfFiguresInRowToWinn);
  }

  createArrayOfNElements(n:number){
    let output = [];
    for(let i = 1; i < n + 1; i++){ output.push(i) }
    return output;
  }
}

