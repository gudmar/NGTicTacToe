import { Injectable } from '@angular/core';
import { TestCase, Figure, CellCords, CellDescriptor, FigureNotEmpty } from '../../app.types'
import { BoardHandlerServiceService } from '../../tic-tac-toe/board-handler-service.service'
import { TestCaseValidatorService } from './test-case-validator.service'


@Injectable({
  providedIn: 'root'
})
export class ArrayToBoardTranslatorService {

  testValidator: TestCaseValidatorService;

  constructor(testValidator: TestCaseValidatorService) {
    this.testValidator = new TestCaseValidatorService();
  }

  createBoardModelFromArrayOfCellDescriptors(arrayOfCellDescorptors: CellDescriptor[]):number[][]{
    let convertSingleField = function(element: CellDescriptor){
      return '' ? 0 : element.figure == 'Circle' ? 1 : 2;
    }
    let flattenedModel = arrayOfCellDescorptors.map(convertSingleField);
    let modelArraySize = Math.sqrt(arrayOfCellDescorptors.length);
    let output:number[][] = [];
    let rowArray:number[] = [];
    let i = 0;
    for (let element of arrayOfCellDescorptors){
      rowArray.push(convertSingleField(element));
      i++;
      if (arrayOfCellDescorptors.length % i == modelArraySize){
        output.push(rowArray);
        rowArray = [];
      }
    }
    return output;
  }

  createArrayOfCellDescirptors(arrayBoardModel:number[][]):CellDescriptor[]{
    let output = [];
    let arraySize = this.getArraySize(arrayBoardModel);
    let flattenedBoardModel = this.flattenBoardModelArray(arrayBoardModel)
    let converteSingleElement = function(this: ArrayToBoardTranslatorService, element: number, index:number){
      let figure = flattenedBoardModel[index] == 0 ? '': flattenedBoardModel[index] == 1?"Circle" : "Cross";
      return this.getSingleCellDescriptor(this.indexToColumn(index, arraySize), this.indexToRow(index, arraySize), <Figure>figure)
    }.bind(this)
    return flattenedBoardModel.map(converteSingleElement)
  }

  indexToRow(index:number, arraySize:number){
    return Math.floor((index + 1) / arraySize)
  }

  indexToColumn(index:number, arraySize:number){
    return (index + 1) % arraySize;
  }

  flattenBoardModelArray(arrayBoardModel:number[][]){
    let output:number[] = [];
    let nrOfRows = this.getArraySize(arrayBoardModel);
    for (let row of arrayBoardModel){
      output = [...output, ...row]
    }
    return output;
  }

  getSingleCellDescriptor(colNr: number, rowNr: number, figure: Figure): CellDescriptor{
    return {
      figure: figure,
      id: rowNr + colNr - 1,
      row: rowNr,
      column: colNr,
      isPartOfWinningPlot: false,
      isOccupied: figure == 'Circle' || figure == "Cross" ? true : false,
      onclick: ()=>{}
    }
  }

  calculateNrOfElementsInArray(arrayBoardModel: number[][]):number{
    let size = this.getArraySize(arrayBoardModel);
    return size * size;
  }

  getArraySize(arrayBoardModel: number[][]):number{
    if (!this.testValidator.validateBoardModelArray(arrayBoardModel)) return -1;
    return this.testValidator.getBoardHeight(arrayBoardModel)
  }


}

let testCase1:TestCase = {
  name: 'some test',
  input: [[0, 0, 1, 2, 0],
          [0, 0, 1, 2, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]],
  expectedOutput: [[3, 1], [3, 2], [3, 3]]
}

// export interface CellDescriptor{
//     figure: Figure,
//     id: number,
//     row: number,
//     column: number,
//     isPartOfWinningPlot: boolean,
//     isOccupied: boolean,
//     onclick: () => void
//   }

