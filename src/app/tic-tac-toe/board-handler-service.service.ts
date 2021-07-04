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
  }
