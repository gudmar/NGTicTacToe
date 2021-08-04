import { Injectable } from '@angular/core';
import { CellDescriptor, Figure, CellCords, FigureNotEmpty } from '../app.types.d'
import { WinnerSearcherService } from './winner-searcher.service'
import { ConcatSource } from 'webpack-sources';
import { PatternSearcherService } from './strategies/pattern-searcher.service'
import { CanGameBeWonByAnyoneService } from './strategies/can-game-be-won-by-anyone.service'
import { ConstantPool } from '@angular/compiler';

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
    isComputerOponent = true;
    isGameOver = false;
    boardSize: number = 0;
    nrOfFiguresNeededToWinn: number = 3;
    board: CellDescriptor[] = [];
    _nextFigure: FigureNotEmpty = 'Circle';
    set nextFigure(val: FigureNotEmpty) {
      this._nextFigure = val;
      this.communicationFunction("nextFigure", this.nextFigure);
      // if (!this.winnerChecker.canGameStillBeWon()) this.communicationFunction('gameCannotBeWon', true)
      this.communicationFunction('gameCannotBeWon', !this.winnerChecker.canGameStillBeWon())
    }
    get nextFigure() {return this._nextFigure}
    // nextFigureChangedInformer: Function = (figure:FigureNotEmpty) => {}
    initialFigure: FigureNotEmpty = 'Circle';
    winnerChecker: WinnerSearcherService;
    winningFigure: Figure = '';
    _humansFigure: FigureNotEmpty = "Circle"
    set humansFigure(val: FigureNotEmpty) {
      // debugger;
      this._humansFigure = val;
      this.computersFigure = this.humansFigure == "Circle" ? "Cross" : "Circle";
      if (this.shouldComputerMakeFirstMove()) this.makeNextMove();
      if (this.winnerChecker.isDraw()) this.setGameOver();
      this.ifHumanCrossBoardEmptyOponentComputerMakeFirstMove();
    }
    get humansFigure() {return this._humansFigure;}
    computersFigure: FigureNotEmpty = this.humansFigure == "Circle" ? "Cross" : "Circle";
    nextMoveGetter: PatternSearcherService = new PatternSearcherService(this)
    communicationFunction: Function = (command: string, data: any) => {};
    parentComponentGameOverSetter: Function = ()=>{};
    parentComponentGameOverResetter: Function = ()=>{};
    constructor(){
      this.winnerChecker  = new WinnerSearcherService(this);
      if (this.shouldComputerMakeFirstMove()) this.makeNextMove();
    }

    shouldComputerMakeFirstMove():boolean{
      if (!this.isComputerOponent) return false;
      return this.computersFigure == this.nextFigure;
    }

    changeFigureOwners(newHumanFigure: FigureNotEmpty){
      // debugger;
      if (this.humansFigure != newHumanFigure){
        this.humansFigure = newHumanFigure;
        this.computersFigure = this.humansFigure == "Circle" ? "Cross" : "Circle";
        this.makeNextMove();
        this.showWinner();
        if (this.winnerChecker.isDraw()) this.setGameOver();
      }
    }

    setCommunicationFunction(callback: Function) {
      this.communicationFunction = callback;
    }

    setIsComputerOponent(val: boolean){
      this.isComputerOponent = val;
      if (val == true) this.ifHumanCrossOponentComputerMakeFirstMove()
      // debugger;
    };

    setNextFigure(val: FigureNotEmpty) {this.nextFigure = val};
    setHumansFigure(val: FigureNotEmpty) {
      // this.humansFigure = val;
      // this.computersFigure = this.humansFigure == "Circle" ? "Cross" : "Circle"
      this.humansFigure = val;
    }

    setBoardSize(boardSize:number){ //, nrOfFiguresInRowToWinn: number){
      this.boardSize = boardSize;
      // this.nrOfFiguresNeededToWinn = nrOfFiguresInRowToWinn;
      this.board = createArrayOfEmements<CellDescriptor>(this.boardSize * this.boardSize, this.createSingleCellDescriptor.bind(this));
      this.nextFigure = this.initialFigure;    
    }

    setInitialFigures(initialFigures:{humansFigure: FigureNotEmpty, nextFigure: FigureNotEmpty}){
      this.initialFigure = initialFigures.nextFigure;
      this.nextFigure = initialFigures.nextFigure;
      this.humansFigure = initialFigures.humansFigure;
      this.computersFigure = this.humansFigure == "Circle" ? "Cross" : "Circle";     
    }

    setNrOfFiguresNeededToWinn(val: number){
      this.nrOfFiguresNeededToWinn = val;
    }

    setGameOver(){this.isGameOver = true;}

    toggleOponent(){
      this.isComputerOponent = !this.isComputerOponent;
      
    }

    makeNextMove(){
      let nextMoveCords = this.nextMoveGetter.getNextMoveCords(this.computersFigure);
      if (nextMoveCords.length > 0) this.setSpecifiedFigureToRowCol(nextMoveCords[0], nextMoveCords[1], this.nextFigure);
      // debugger
      this.toggleNextFigure();
      // debugger;
    }  

    setSpecifiedFigureToRowCol(rowNr: number, colNr: number, figure: FigureNotEmpty){
      let destinationIndex = (colNr - 1) * this.boardSize + (rowNr - 1);
      this.board[destinationIndex].figure = figure;
      // this.toggleNextFigure();
      this.setCellToOccupied(destinationIndex);
      this.showWinner();
      // if (this.winnerChecker.isDraw()) this.setGameOver();

    }


    parametrize_ForTests(readyBoard: CellDescriptor[], nrOfFiguresNeededToWinn: number){
      this.board = readyBoard;
      this.nrOfFiguresNeededToWinn = nrOfFiguresNeededToWinn;
      this.boardSize = Math.sqrt(readyBoard.length);
    }

    restartGame(){
      this.board = createArrayOfEmements<CellDescriptor>(this.boardSize * this.boardSize, this.createSingleCellDescriptor.bind(this));
      this.winningFigure = '';
      this.nextFigure = this.initialFigure;
      console.log(`restartGame: ${this.initialFigure}`)
      this.isGameOver = false;
      this.communicationFunction("gameCannotBeWon", false)
      this.ifHumanCrossBoardEmptyOponentComputerMakeFirstMove();
    }

    ifHumanCrossBoardEmptyOponentComputerMakeFirstMove(){
      if (this.isComputerOponent && this.humansFigure == "Cross" && this.isBoardEmpty()) {
        if (this.nextFigure == "Cross") this.toggleNextFigure();
        this.makeNextMove();
      }
    }

    ifHumanCrossOponentComputerMakeFirstMove(){
      if (this.isComputerOponent && this.computersFigure == this.nextFigure) {
        // if (this.nextFigure == "Cross") this.toggleNextFigure();
        this.makeNextMove();
        // this.toggleNextFigure();
      }
    }

    isBoardEmpty(){
      let isFieldEmpty = function(element: any) {
        return element.figure == ""
      }
      return this.board.every(isFieldEmpty)
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
      return this.board[this.getIndex(col, row)].isPartOfWinningPlot
    }

    checkIfCellIsOccupied(row:number, col: number){
      return this.board[this.getIndex(col, row)].isOccupied
    }
  
    createSingleCellDescriptor(index:number):CellDescriptor{
      let that = this;
      let thisCellIndex = index;
      return {
        figure: '',
        id: index + 1,
        row: Math.floor(index / that.boardSize) + 1, // 1 to size
        column: index % that.boardSize + 1,
        isPartOfWinningPlot: false,
        isOccupied: false,
        onclick: function(){
          if (!that.isGameOver){
            if (that.board[index].figure != '') return null;
            that.setFigureToCell(index);
            that.toggleNextFigure();
            that.setCellToOccupied(index);
            that.showWinner();
            if (that.winnerChecker.isDraw()) that.setGameOver();
            if (!that.isGameOver && that.isComputerOponent) that.makeNextMove();
          }
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
        this.isGameOver = true;
      } else if (winningCrossCords.length > 0){
        this.winningFigure = "Cross";
        winningCords = winningCrossCords
        this.isGameOver = true;
      }
      this.setCellsToWinning(winningCords)
    }
  
    getFigureAtRowColumn(colNr:number,rowNr:number):string{
      // !!!!
  
      return this.board[this.getIndex(colNr, rowNr)].figure
    }
  
    fireOnclickHandlerAtRowColumn(rowNr:number, colNr:number){
      this.board[this.getIndex(colNr, rowNr)].onclick();
    }
  
    getIndex(colNr:number, rowNr:number):number{
      return (rowNr - 1) * this.boardSize + (colNr - 1)
    }
  
    setFigureToCell(cellNr: number){
      this.board[cellNr].figure = this.nextFigure;
    }
  
    toggleNextFigure(){
      this.nextFigure = this.nextFigure == 'Circle' ? 'Cross' : 'Circle';
      // this.nextFigureChangedInformer(this.nextFigure);
      // this.communicationFunction("nextFigure", this.nextFigure)

    }
  }
