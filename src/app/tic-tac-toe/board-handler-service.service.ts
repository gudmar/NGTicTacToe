import { Injectable } from '@angular/core';
import { CellDescriptor, Figure, CellCords } from '../app.types.d'
import { WinnerSearcherService } from './winner-searcher.service'
// import { Z_PARTIAL_FLUSH } from 'zlib';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

function createArrayOfEmements<T>(arraySize: number, elementCreator: (index: number)=>T){
  let output = [];
  for (let i = 0; i< arraySize; i++){
    let newElement:T = elementCreator(i);
    output.push(newElement)
  }
  return output;
}

@Injectable({
  providedIn: 'root'
})
export class BoardHandlerServiceService {
    boardSize: number = 0;
    nrOfRows: number = this.boardSize;
    nrOfColumns: number = this.boardSize;
    nrOfFiguresNeededToWinn: number = 3;
    board: CellDescriptor[] = [];
    nextFigure: Figure = '';
    winnerChecker: WinnerSearcherService;
    winningFigure: Figure = '';
    constructor(){
      this.winnerChecker  = new WinnerSearcherService(this);
    }
  
    parametrize(boardSize: number, nrOfFiguresInRowToWinn: number){
      this.nrOfRows = boardSize;
      this.nrOfColumns = boardSize;
      this.boardSize = boardSize;
      this.nrOfFiguresNeededToWinn = nrOfFiguresInRowToWinn;
      this.board = createArrayOfEmements<CellDescriptor>(this.nrOfColumns * this.nrOfRows, this.createSingleCellDescriptor.bind(this));
      this.nextFigure = 'Circle';
    }

    restartGame(){
      this.board = createArrayOfEmements<CellDescriptor>(this.nrOfColumns * this.nrOfRows, this.createSingleCellDescriptor.bind(this));
      this.winningFigure = '';
    }

    setCellsToWinning(setOfCellCords: CellCords[]){
      let setSingleCollToWinning = function(this: BoardHandlerServiceService, cord: CellCords){
        let xCord = cord[0];
        let yCord = cord[1];
        this.board[this.getIndex(xCord, yCord)].isPartOfWinningPlot = true;
      }.bind(this)
      for(let singleCord of setOfCellCords){
        setSingleCollToWinning(singleCord);
      }
    }

    checkIfIsPartOfWinningPlot(row:number, col:number){
      return this.board[this.getIndex(row, col)].isPartOfWinningPlot
    }

    checkIfCellIsOccupied(row:number, col: number){
      return this.board[this.getIndex(row, col)].isOccupied
    }
  
    createSingleCellDescriptor(index:number):CellDescriptor{
      let that = this;
      let thisCellIndex = index;
      return {
        figure: '',
        id: index + 1,
        row: Math.floor(index / that.nrOfColumns) + 1, // 1 to size
        column: index % that.nrOfRows + 1,
        isPartOfWinningPlot: false,
        isOccupied: false,
        onclick: function(){
          if (that.board[index].figure != '') return null;
          that.setFigureToCell(index);
          that.toggleNextFigure();
          that.setCellToOccupied(index);
          that.showWinner();
          return null;
        }
      }
    }

    setCellToOccupied(index:number){
      this.board[index].isOccupied = true;
    }
  
    showWinner(){
      let winningCords:CellCords[] = [];
      let winningCircleCords = this.winnerChecker.getWinnerCords("Circle");
      let winningCrossCords = this.winnerChecker.getWinnerCords("Cross");
      if (winningCircleCords.length > 0) {
        this.winningFigure = "Circle";
        winningCords = winningCircleCords
      } else if (winningCrossCords.length > 0){
        this.winningFigure = "Cross";
        winningCords = winningCrossCords
      }

      this.setCellsToWinning(winningCords)
    }
  
    getFigureAtRowColumn(rowNr:number, colNr:number):string{
  
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
