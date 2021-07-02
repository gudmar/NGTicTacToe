import { Component, Injectable, TemplateRef } from '@angular/core';
import { bindCallback } from 'rxjs';


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
    let newElement:T = elementCreator(i);
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
  boardSize = 5;
  nrOfRows = this.boardSize;  // for simplisity and pleability let board be a square
  nrOfColumns = this.boardSize;
  nrOfFiguresInRowToWinn = 3;
  rowIds = this.createArrayOfNElements(this.boardSize);
  colIds = this.createArrayOfNElements(this.boardSize);

  constructor(public boardHandler: BoardHandlerService){
    this.boardHandler = boardHandler;
    this.boardHandler.parametrize(this.boardSize, this.nrOfFiguresInRowToWinn);
  }

  createArrayOfNElements(n:number){
    let output = [];
    for(let i = 1; i < n + 1; i++){ output.push(i) }
    return output;
  }
}

@Injectable({providedIn: 'root'})
class BoardHandlerService{
  boardSize: number = 0;
  nrOfRows: number = this.boardSize;
  nrOfColumns: number = this.boardSize;
  nrOfFiguresNeededToWinn: number = 3;
  board: CellDescriptor[] = [];
  nextFigure: Figure = '';
  winnerChecker: SameFiguresInRowSearcher;
  constructor(){
    this.winnerChecker  = new SameFiguresInRowSearcher(this);
  }

  parametrize(boardSize: number, nrOfFiguresInRowToWinn: number){
    this.nrOfRows = boardSize;
    this.nrOfColumns = boardSize;
    this.boardSize = boardSize;
    this.nrOfFiguresNeededToWinn = nrOfFiguresInRowToWinn;
    this.board = createArrayOfEmements<CellDescriptor>(this.nrOfColumns * this.nrOfRows, this.createSingleCellDescriptor.bind(this));
    this.nextFigure = 'Circle';
  }

  createSingleCellDescriptor(index:number):CellDescriptor{
    let that = this;
    let thisCellIndex = index;
    return {
      figure: '',
      id: index + 1,
      row: Math.floor(index / that.nrOfColumns) + 1, // 1 to size
      column: index % that.nrOfRows + 1,
      onclick: function(){
        if (that.board[index].figure != '') return null;
        that.setFigureToCell(index);
        that.toggleNextFigure();
        that.showWinner();
        return null;
      }
    }
  }

  showWinner(){
    console.log('Checking if Circle winns')
    // console.log(this.checkIfFigureWinns('Circle'));
    console.log(this.winnerChecker.getWinnerCords("Circle"))
    console.log('Checking if Cross wins')
    // console.log(this.checkIfFigureWinns('Cross'))
    console.log(this.winnerChecker.getWinnerCords('Cross'))
  }

  getFigureAtRowColumn(rowNr:number, colNr:number):string{

    // console.log(`${rowNr} ${colNr}`)
    return this.board[this.getIndex(rowNr, colNr)].figure
  }

  fireOnclickHandlerAtRowColumn(rowNr:number, colNr:number){
    this.board[this.getIndex(rowNr, colNr)].onclick();
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



  // checkIfFigureWinns(figure: 'Circle' | 'Cross'){
  //   type CellCords = number[];
  //   let winnerCanditateCordMemory:CellCords[] = [];
  //   let that = this;

  //   let checkArrayForWinner = function(arrayOfCellCords:CellCords[]){
  //     return findNrOfFeaguresOneByOne(that.nrOfFiguresNeededToWinn, arrayOfCellCords).length > 0 ? true : false
  //   }

  //   let findNrOfFeaguresOneByOne = function(nrOfFiguresToFind: number, arrayOfCellCords:CellCords[]){
  //     let nrOfFiguresInRowSoFar = 0;
  //     let winnerFound = false;
  //     let saveCords = function(xCord:number, yCord:number){
  //       winnerCanditateCordMemory.push([xCord, yCord])
  //     }
  //     let clearCordsMemory = function(){winnerCanditateCordMemory = []}

  //     arrayOfCellCords.forEach((element:CellCords, index:number) => {
  //       let xCord = element[0];
  //       let yCord = element[1];
  //       let currentFigure = that.getFigureAtRowColumn(xCord, yCord);
  //       if (currentFigure == figure) {nrOfFiguresInRowSoFar++; saveCords(xCord, yCord); }
  //       else {
  //         if (!winnerFound) {nrOfFiguresInRowSoFar = 0; clearCordsMemory();}
  //       };
  //       if (nrOfFiguresInRowSoFar == nrOfFiguresToFind) winnerFound = true;
  //     })
  //     return winnerFound ? winnerCanditateCordMemory : [];
  //   }

  //   let checkRowForWinner = function(rowNr:number){
  //     let cords = [];
  //     for(let i = 0; i < that.nrOfColumns; i++){
  //       cords.push([rowNr, i + 1])
  //     }
  //     return checkArrayForWinner(cords)
  //   }

  //   let checkColumnForWinner = function(colNr:number){
  //     let cords = [];
  //     for(let i = 0; i < that.nrOfRows; i++){
  //       cords.push([i + 1, colNr])
  //     }
  //     return checkArrayForWinner(cords)
  //   }

  //   let doesCordBelongToBoard = function(cord: CellCords) {
  //     let xCord = <number>cord[0];
  //     let yCord = <number>cord[1];
  //     if (xCord < 1) return false;
  //     if (xCord > that.boardSize) return false;
  //     if (yCord < 1) return false;
  //     if (yCord > that.boardSize) return false;
  //     return true;
  //   }

  //   let checkLeftTopDiagonalForWinner = function(diagonalStartColumn: number){
  //     // Left Top diagonal starts in left top board corner
  //     let cords = [];
  //     for(let i = 0; i <= that.boardSize; i++){
  //       let xCord = i + diagonalStartColumn;
  //       let yCord = i + 1;
  //       if (doesCordBelongToBoard([xCord, yCord])) {
  //         cords.push([xCord, yCord]);
  //       }
  //     }
  //     return checkArrayForWinner(cords)
  //   }

  //   let checkLeftBottomDiagonalForWinner = function(diagonalStartColumn: number){
  //     // Left Bottom diagonal starts in left bottom board corner
  //     let cords = [];
  //     for(let i = 0; i <= that.boardSize; i++){
  //       let xCord = diagonalStartColumn - i;
  //       let yCord = i + 1;
  //       if (doesCordBelongToBoard([xCord, yCord])) {
  //         cords.push([xCord, yCord]);
  //       }
  //     }
  //     return checkArrayForWinner(cords)
  //   }

  //   let checkAllRowsForWinner = function(){
  //     for (let row = 1; row <= that.nrOfRows; row++){
  //       if (checkRowForWinner(row) == true) return row;
  //     }
  //     return -1;
  //   }

  //   let checkAllColsForWinner = function(){
  //     for (let col = 1; col <= that.nrOfColumns; col++){
  //       if (checkColumnForWinner(col) == true) return col;
  //     }
  //     return -1
  //   }

  //   let checkAllLeftTopDiagonalsForWinner = function() {
  //     let firstDiagonalOffset = -that.boardSize + 2;
  //     let lastDiagonalOffset = that.boardSize;
  //     for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
  //       let isWinnerFound = checkLeftTopDiagonalForWinner(diagonalNr);
  //       if (isWinnerFound) return true
  //     }
  //     return false;
  //   }

  //   let checkAllLeftBottomDiagonalsForWinner = function() {
  //     let firstDiagonalOffset = 1;
  //     let lastDiagonalOffset = that.boardSize * 2 - 1; // number of all diagonals in square;
  //     for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
  //       let isWinnerFound = checkLeftBottomDiagonalForWinner(diagonalNr);
  //       if (isWinnerFound) return true
  //     }
  //     return false;
  //   }
  //   if (checkAllColsForWinner() != -1) return winnerCanditateCordMemory;
  //   if (checkAllRowsForWinner() != -1) return winnerCanditateCordMemory;
  //   if (checkAllLeftBottomDiagonalsForWinner()) return winnerCanditateCordMemory;
  //   if (checkAllLeftTopDiagonalsForWinner()) return winnerCanditateCordMemory;
  //   return []

  // }
}

module FigureTypes {
  export type CellCords = number[];
  export type FigureNotEmpty = 'Circle' | 'Cross';
}


class SameFiguresInRowSearcher {
  context:BoardHandlerService

  constructor(context:BoardHandlerService){
    this.context = context;
  }

  getWinnerCords(figure:FigureTypes.FigureNotEmpty){
    return this.getCordinanceOfNFiguresInRow(figure, this.context.nrOfFiguresNeededToWinn)
  }

  getCordinanceOfNFiguresInRow(figure:FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number,){
    let winnerInAllColumns = this.checkAllColsForWinner(figure, nrOfFiguresToFind);
    let winnerInAllRows = this.checkAllRowsForWinner(figure, nrOfFiguresToFind);
    let winnerInAllLeftTopDiagonals = this.checkAllLeftTopDiagonalsForWinner(figure, nrOfFiguresToFind);
    let winnerInAllLeftBottomDiagonals = this.checkAllLeftBottomDiagonalsForWinner(figure, nrOfFiguresToFind)
    if (winnerInAllRows.length > 0) return winnerInAllRows;
    if (winnerInAllColumns.length > 0) return winnerInAllColumns;
    if (winnerInAllLeftBottomDiagonals.length > 0) return winnerInAllLeftTopDiagonals;
    if (winnerInAllLeftTopDiagonals) return winnerInAllLeftBottomDiagonals;
    return []
  }

  checkAllRowsForWinner(figure: FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number,){
    for (let row = 1; row <= this.context.nrOfRows; row++){
      let winnerList = this.getWinnerOutOfSingleRow(figure, nrOfFiguresToFind, row)
      if (winnerList.length >= this.context.nrOfFiguresNeededToWinn) return winnerList;
    }
    return [];
  }


  checkAllColsForWinner(figure: FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number,){
      for (let col = 1; col <= this.context.nrOfColumns; col++){
        let winnerList = this.getWinnerOutOfSingleColumn(figure, nrOfFiguresToFind, col);
        if (winnerList.length >= this.context.nrOfFiguresNeededToWinn) return winnerList;
      }
      return [];
    }


  checkAllLeftTopDiagonalsForWinner(figure: FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number,) {
    let firstDiagonalOffset = - this.context.boardSize + 2;
    let lastDiagonalOffset = this.context.boardSize;
    for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
      let winnerCords = this.checkLeftTopDiagonalForWinner(figure, nrOfFiguresToFind, diagonalNr);
      if (winnerCords.length > 0) return winnerCords
    }
    return [];
  }

  checkAllLeftBottomDiagonalsForWinner(figure: FigureTypes.FigureNotEmpty,  nrOfFiguresToFind: number) {
    let firstDiagonalOffset = 1;
    let lastDiagonalOffset = this.context.boardSize * 2 - 1; // number of all diagonals in square;
    for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
      let winnerCords = this.checkLeftTopDiagonalForWinner(figure, nrOfFiguresToFind, diagonalNr);
      if (winnerCords.length > 0) return winnerCords;
    }
    return [];
  }

  getWinnerOutOfSingleRow(figure:FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number, rowNr:number){
    let cords = [];
    for(let i = 0; i < this.context.nrOfColumns; i++){
      cords.push([rowNr, i + 1])
    }
    return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind, cords)
  }

  getWinnerOutOfSingleColumn(figure:FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number, colNr:number){
    let cords = [];
    for(let i = 0; i < this.context.nrOfRows; i++){
      cords.push([i + 1, colNr])
    }
    return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind, cords)
  }


  checkLeftTopDiagonalForWinner(figure:FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number, diagonalStartColumn: number){
    // Left Top diagonal starts in left top board corner
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let xCord = i + diagonalStartColumn;
      let yCord = i + 1;
      if (this.doesCordBelongToBoard([xCord, yCord])) {
        cords.push([xCord, yCord]);
      }
    }
    return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind , cords)
  }

  checkLeftBottomDiagonalForWinner(figure:FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number, diagonalStartColumn: number){
    // Left Bottom diagonal starts in left bottom board corner
    let cords = [];
    for(let i = 0; i <= this.context.boardSize; i++){
      let xCord = diagonalStartColumn - i;
      let yCord = i + 1;
      if (this.doesCordBelongToBoard([xCord, yCord])) {
        cords.push([xCord, yCord]);
      }
    }
    return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind, cords)
  }


checkArrayForWinner(figure:FigureTypes.FigureNotEmpty, arrayOfCellCords:FigureTypes.CellCords[]){
  return this.findNrOfFeaguresOneByOne(figure, this.context.nrOfFiguresNeededToWinn, arrayOfCellCords).length > 0 ? true : false
}

findNrOfFeaguresOneByOne(figure: FigureTypes.FigureNotEmpty, nrOfFiguresToFind: number, arrayOfCellCords:FigureTypes.CellCords[]){
    let nrOfFiguresInRowSoFar = 0;
    let winnerFound = false;
    let winnerCanditateCordMemory: FigureTypes.CellCords[] = [];

    let saveCords = function(xCord:number, yCord:number){
      winnerCanditateCordMemory.push([xCord, yCord])
    }
    let clearCordsMemory = function(){winnerCanditateCordMemory = []}

    let checkSingleCord = function(this:any, element:FigureTypes.CellCords, index:number){
      let xCord = element[0];
      let yCord = element[1];
      let currentFigure = this.context.getFigureAtRowColumn(xCord, yCord);
      if (currentFigure == figure) {nrOfFiguresInRowSoFar++; saveCords(xCord, yCord); }
      else {
        if (!winnerFound) {nrOfFiguresInRowSoFar = 0; clearCordsMemory();}
      };
      if (nrOfFiguresInRowSoFar == nrOfFiguresToFind) winnerFound = true;
    }.bind(this)

    arrayOfCellCords.forEach(checkSingleCord);
    return winnerFound ? winnerCanditateCordMemory : [];
  }

  doesCordBelongToBoard(cord: FigureTypes.CellCords) {
    let xCord = <number>cord[0];
    let yCord = <number>cord[1];
    if (xCord < 1) return false;
    if (xCord > this.context.boardSize) return false;
    if (yCord < 1) return false;
    if (yCord > this.context.boardSize) return false;
    return true;
  }

}
