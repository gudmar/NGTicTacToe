import { Component, Injectable, TemplateRef } from '@angular/core';


type Figure = 'Circle' | 'Cross' | '';

interface CellDescriptor{
  figure: Figure,
  id: number,
  row: number,
  column: number,
  onclick: () => void
}


function createArrayOfEmements<T>(arraySize: number, elementCreator: (index: number)=>T){
  let output = [];
  for (let i = 0; i< arraySize; i++){
    let newElement = elementCreator(i);
    output.push(newElement)
  }
  return output;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicTacToe';
  nrOfRows = 3;
  nrOfColumns = 3;
  rowIds = [1, 2, 3];
  colIds = [1, 2, 3];

  constructor(public boardHandler: BoardHandlerService){
    this.boardHandler = boardHandler;
    this.boardHandler.parametrize(this.nrOfRows, this.nrOfColumns);
  }
}

@Injectable({providedIn: 'root'})
class BoardHandlerService{
  nrOfRows: number = 0;
  nrOfColumns: number = 0;
  board: CellDescriptor[] = [];
  nextFigure: Figure = '';
  constructor(){
  }

  parametrize(nrOfRows:number, nrOfColumns: number){
    this.nrOfRows = nrOfRows;
    this.nrOfColumns = nrOfColumns;
    this.board = createArrayOfEmements<CellDescriptor>(this.nrOfColumns * this.nrOfRows, this.createSingleCellDescriptor.bind(this));
    this.nextFigure = 'Circle';
  }

  createSingleCellDescriptor(index:number):CellDescriptor{
    let that = this;
    return {
      figure: '',
      id: index + 1,
      row: Math.floor(index / that.nrOfColumns) + 1, // 1 to size
      column: index % that.nrOfRows + 1,
      onclick: function(){
        that.setFigureToCell(index);
        that.toggleNextFigure()
      }
    }
  }

  getFigureAtRowColumn(rowNr:number, colNr:number):string{
    console.log(this.board[this.getIndex(rowNr, colNr)].figure)
    console.log(this.board)
    console.log(this.getIndex(rowNr, colNr))
    console.log(rowNr, colNr)
    return this.board[this.getIndex(rowNr, colNr)].figure
  }

  fireOnclickHandlerAtRowColumn(rowNr:number, colNr:number){
    this.board[this.getIndex(rowNr, colNr)].onclick();
    console.log(this.nextFigure)
  }

  getIndex(rowNr:number, colNr:number):number{
    return (rowNr - 1) * this.nrOfColumns + (colNr - 1)
  }

  setFigureToCell(cellNr: number){
    this.board[cellNr].figure = this.nextFigure;
  }

  toggleNextFigure(){
    this.nextFigure = this.nextFigure == 'Circle' || this.nextFigure == '' ? 'Cross' : 'Circle';
  }
}
