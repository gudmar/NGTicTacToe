import { Injectable } from '@angular/core';
import { TestCase, Figure, CellCords, CellDescriptor, FigureNotEmpty, PatternDescriptor } from '../../app.types'

@Injectable({
  providedIn: 'root'
})
export class TestCaseValidatorService {

  constructor() { }

  validateTestCase(testCase:TestCase):boolean{
    if (!this.hasObjectKeysFromList(testCase, ['name', 'input', 'expectedOutput'])) return false;
    if (!this.validateBoardModelArray(testCase['input'])) return false;
    if (!this.validateExpectedResult(testCase['expectedOutput'])) return false;
    return true;
  }

  validateBoardModelArray(boardModelArray: number[][]): boolean{
    if (!this.areAllRowsInArrayEqual(boardModelArray)) return false;
    if (!this.areNrOfRowsNrOfColsEqual(boardModelArray)) return false;
    if (!this.areAllElements012(boardModelArray)) return false;
    return true;    
  }

  validateExpectedResult(expectedResult: string | number[][] | PatternDescriptor):boolean{
    if (typeof (expectedResult == 'string')) return true;
    if (typeof (expectedResult == 'PatternDescirptor')) this.validatePatternDescriptor(<PatternDescriptor>expectedResult)
    if (this.validateCordsArray(<number[][]>expectedResult)) return true;
    if (this.validateBoardModelArray(<number[][]>expectedResult)) return true;
    return false;
  }

  validatePatternDescriptor(expectedResult: PatternDescriptor){
    let keys = Object.keys(expectedResult)
    if (keys.includes('fonudElements')) return false;
    if (keys.includes('nextMoveProposals')) return false;
    if (!this.validateCordsArray(expectedResult.foundElements)) return false;
    if (!this.validateCordsArray(expectedResult.nextMoveProposals)) return false;
    return true;
  }


  hasObjectKeysFromList(obj:Object, keys:string[]):boolean{
    for (let key of keys){
      if (!(key in obj)) return false
    }
    return true;
  }

  validateCordsArray(cordsArray: CellCords[]){
    let isEachElementNumber = true;
    if (this.getBoardWidth(cordsArray) != 2)  return false;
    if (this.areAllRowsInArrayEqual(cordsArray)) return false;
    cordsArray.forEach((element) => {
      if (typeof(element) != 'number') isEachElementNumber = false;
    })
    return isEachElementNumber;
  }

  areNrOfRowsNrOfColsEqual(boardModelArray: number[][]):boolean{
    return this.getBoardHeight(boardModelArray) == this.getBoardWidth(boardModelArray);
  }

  getBoardWidth(boardModelArray: number[][]):number{
      return boardModelArray[0].length
  }
  getBoardHeight(boardModelArray: number[][]):number{
    return boardModelArray.length;
  }
  areAllElements012(boardModelArray: number[][]): boolean{
    let arraySize = this.getBoardHeight(boardModelArray);
    let isFieldValid = function(field: number) {
      return field == 0 || field == 1 || field == 2 ? true : false;
    }
    for (let i = 0; i < arraySize; i++){
      for (let j = 0; j < arraySize; j++){
        if (isFieldValid(boardModelArray[j][i]) == false) return false;
      }
    }
    return true;
  }
  areAllRowsInArrayEqual(boardModelArray: number[][]):boolean{
    let firstRowLength = this.getBoardWidth(boardModelArray)
    let nrOfRows = this.getBoardHeight(boardModelArray)
    for(let row = 0; row < nrOfRows; row++){
      if (boardModelArray[row].length != firstRowLength) return false;
    }
    return true;
  }
}
