import { Injectable } from '@angular/core';
import { PatternDescriptor, FigureNotEmpty, SlicedPatternDescriptor } from '../../app.types'

@Injectable({
  providedIn: 'root'
})
export class PlaceForWinerSearcherService {
  currentFigure: FigureNotEmpty = "Circle";
  get opositeFigure(): FigureNotEmpty { return this.getOpositeFigure(this.currentFigure)};
  nrOfElementsInRowToWinn: number = 0;
  nrOfMatchedElementsSoFar: number = 0;
  nextMoveProposals: number[] = [];
  foundElements: number[] = [];
  constructor() { }

  setNrOfFiguresInRowToWin(val: number){this.nrOfElementsInRowToWinn = val;}
  getPattern(
    figure: FigureNotEmpty, 
    nrOfElementsInRowToWin: number, 
    boardSlice: string[], 
    shouldRunFromEachGap: boolean = true
  ):SlicedPatternDescriptor{
    this.restartFinding();
    this.nrOfElementsInRowToWinn = nrOfElementsInRowToWin;
    this.currentFigure = figure;
    let index: number = 0;
    let patternFound = false;
    for (let element of boardSlice){
      if (element == "" || element == this.currentFigure) {
        this.nrOfMatchedElementsSoFar++;
        if (element == "") this.nextMoveProposals.push(index);
        if (element == this.currentFigure) this.foundElements.push(index)
      }
      if (this.nrOfMatchedElementsSoFar >= this.nrOfElementsInRowToWinn) patternFound = true;
      if (!patternFound && element == this.opositeFigure) this.restartFinding()
      index++;
    }
    if (patternFound) {
      if (this.foundElements.length == 0) this.foundElements.push(0); 
      // Otherwise strategyFIndFirstPatter will discard this solution, as it was designed for finding patterns, not only nextProposedMoves
      // Here this is acceptable, as anyway only lenght of nextMoveProposals will be taked for calculations
      return this.getPatternDescriptor(this.foundElements, this.nextMoveProposals)
    }
    return this.getEmptyPatternDescriptor();
  }

  restartFinding(){
    this.nrOfMatchedElementsSoFar = 0;
    this.nextMoveProposals = [];
    this.foundElements = [];
  }

  getOpositeFigure(figure: FigureNotEmpty){return figure == "Circle" ? "Cross" : "Circle";}

  getEmptyPatternDescriptor() {
    return this.getPatternDescriptor([], [])
  }
  getPatternDescriptor(foundElements: number[], nextMoveProposals: number[]){
    return {
      foundElements: foundElements,
      nextMoveProposals: nextMoveProposals,
    }
  }
}
