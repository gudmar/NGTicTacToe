import { Injectable } from '@angular/core';
import { BoardHandlerServiceService } from './board-handler-service.service'
import { CellCords, FigureNotEmpty, Figure } from '../app.types.d'
import { CanGameBeWonByAnyoneService } from './strategies/can-game-be-won-by-anyone.service'


@Injectable({
  providedIn: 'root'
})
export class WinnerSearcherService {
    context:BoardHandlerServiceService
    canGameStillBeOneOracle: CanGameBeWonByAnyoneService;
    constructor(context:BoardHandlerServiceService){
      this.context = context;
      this.canGameStillBeOneOracle = new CanGameBeWonByAnyoneService(context)
    }

    isDraw(){
      let isFieldEngaged = function(element:any, index:number){
        if (element.figure == "") return false;
        return true;
      }
      let isEveryFieldEngaged = this.context.board.every(isFieldEngaged);
      return isEveryFieldEngaged
    }
  
    getWinnerCords(figure:FigureNotEmpty){
      return this.getCordinanceOfNFiguresInRow(figure, this.context.nrOfFiguresNeededToWinn)
    }

    canGameStillBeWon(): boolean{
      let isGameWon = false;
      if (this.getWinnerCords("Circle").length > 0) isGameWon = true;
      if (this.getWinnerCords("Cross").length > 0) isGameWon = true;
      if (this.isDraw()) return true;
      if (isGameWon) return true;
      return this.canGameStillBeOneOracle.checkIfGameCanStillBeWonByAnyone()
    }
  
    getCordinanceOfNFiguresInRow(figure:FigureNotEmpty, nrOfFiguresToFind: number,){
      let winnerInAllColumns = this.checkAllColsForWinner(figure, nrOfFiguresToFind);
      let winnerInAllRows = this.checkAllRowsForWinner(figure, nrOfFiguresToFind);
      let winnerInAllLeftTopDiagonals = this.checkAllLeftTopDiagonalsForWinner(figure, nrOfFiguresToFind);
      let winnerInAllLeftBottomDiagonals = this.checkAllLeftBottomDiagonalsForWinner(figure, nrOfFiguresToFind)
      if (winnerInAllRows.length > 0) return winnerInAllRows;
      if (winnerInAllColumns.length > 0) return winnerInAllColumns;
      if (winnerInAllLeftTopDiagonals.length > 0) return winnerInAllLeftTopDiagonals;
      if (winnerInAllLeftBottomDiagonals.length) return winnerInAllLeftBottomDiagonals;
      return []
    }
  
    checkAllRowsForWinner(figure: FigureNotEmpty, nrOfFiguresToFind: number){
      for (let row = 1; row <= this.context.boardSize; row++){
        let winnerList = this.getWinnerOutOfSingleRow(figure, nrOfFiguresToFind, row)
        if (winnerList.length >= this.context.nrOfFiguresNeededToWinn) return winnerList;
      }
      return [];
    }
  
  
    checkAllColsForWinner(figure: FigureNotEmpty, nrOfFiguresToFind: number){
        for (let col = 1; col <= this.context.boardSize; col++){
          let winnerList = this.getWinnerOutOfSingleColumn(figure, nrOfFiguresToFind, col);
          if (winnerList.length >= this.context.nrOfFiguresNeededToWinn) return winnerList;
        }
        return [];
      }
  
  
    checkAllLeftTopDiagonalsForWinner(figure: FigureNotEmpty, nrOfFiguresToFind: number,) {
      let firstDiagonalOffset = - this.context.boardSize + 2;
      let lastDiagonalOffset = this.context.boardSize;
      for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
        let winnerCords = this.checkLeftTopDiagonalForWinner(figure, nrOfFiguresToFind, diagonalNr);
        if (winnerCords.length > 0) return winnerCords
      }
      return [];
    }
  
    checkAllLeftBottomDiagonalsForWinner(figure: FigureNotEmpty,  nrOfFiguresToFind: number) {
      let firstDiagonalOffset = 1;
      let lastDiagonalOffset = this.context.boardSize * 2 - 1; // number of all diagonals in square;
      for (let diagonalNr = firstDiagonalOffset; diagonalNr <= lastDiagonalOffset; diagonalNr++){
        let winnerCords = this.checkLeftBottomDiagonalForWinner(figure, nrOfFiguresToFind, diagonalNr);
        if (winnerCords.length > 0) return winnerCords;
      }
      return [];
    }
  
    getWinnerOutOfSingleRow(figure:FigureNotEmpty, nrOfFiguresToFind: number, rowNr:number){
      let cords = [];
      for(let i = 0; i < this.context.boardSize; i++){
        cords.push([ i + 1, rowNr])
      }
      return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind, cords)
    }
  
    getWinnerOutOfSingleColumn(figure:FigureNotEmpty, nrOfFiguresToFind: number, colNr:number){
      let cords = [];
      for(let i = 0; i < this.context.boardSize; i++){
        cords.push([colNr, i + 1])
      }
      return this.findNrOfFeaguresOneByOne(figure, nrOfFiguresToFind, cords)
    }
  
  
    checkLeftTopDiagonalForWinner(figure:FigureNotEmpty, nrOfFiguresToFind: number, diagonalStartColumn: number){
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
  
    checkLeftBottomDiagonalForWinner(figure:FigureNotEmpty, nrOfFiguresToFind: number, diagonalStartColumn: number){
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
  
  
  checkArrayForWinner(figure:FigureNotEmpty, arrayOfCellCords:CellCords[]){
    return this.findNrOfFeaguresOneByOne(figure, this.context.nrOfFiguresNeededToWinn, arrayOfCellCords).length > 0 ? true : false
  }
  
  findNrOfFeaguresOneByOne(figure: FigureNotEmpty, nrOfFiguresToFind: number, arrayOfCellCords:CellCords[]){
      let nrOfFiguresInRowSoFar = 0;
      let winnerFound = false;
      let winnerCanditateCordMemory: CellCords[] = [];
  
      let saveCords = function(xCord:number, yCord:number){
        winnerCanditateCordMemory.push([xCord, yCord])
      }
      let clearCordsMemory = function(){winnerCanditateCordMemory = []}
  
      let checkSingleCord = function(this:any, element:CellCords, index:number):void | null{
        let xCord = element[0];
        let yCord = element[1];
        let currentFigure = this.context.getFigureAtRowColumn(xCord, yCord);
        if (winnerFound) return null;
        if (currentFigure == figure) {nrOfFiguresInRowSoFar++; saveCords(xCord, yCord); }
        else {
          if (!winnerFound) {nrOfFiguresInRowSoFar = 0; clearCordsMemory();}
        };
        if (nrOfFiguresInRowSoFar == nrOfFiguresToFind) winnerFound = true;
      }.bind(this)
  
      arrayOfCellCords.forEach(checkSingleCord);
      return winnerFound ? winnerCanditateCordMemory : [];
    }
  
    doesCordBelongToBoard(cord: CellCords) {
      let xCord = <number>cord[0];
      let yCord = <number>cord[1];
      if (xCord < 1) return false;
      if (xCord > this.context.boardSize) return false;
      if (yCord < 1) return false;
      if (yCord > this.context.boardSize) return false;
      return true;
    }
  
  }
