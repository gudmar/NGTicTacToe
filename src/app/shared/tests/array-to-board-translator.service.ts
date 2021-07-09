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
      let figure: Figure;
      switch(flattenedBoardModel[index]){
        case 0: figure = ''; break;
        case 1: figure = "Circle"; break;
        case 2: figure = "Cross"; break;
        default: throw new Error(`${this.constructor.name}: board model figure symbol seems out of set 0, 1, 2: ${flattenedBoardModel[index]}.`)
      }

      return this.getSingleCellDescriptor(this.indexToColumn(index, arraySize), this.indexToRow(index, arraySize), <Figure>figure)
    }.bind(this)
    console.log(flattenedBoardModel.map(converteSingleElement))
    return flattenedBoardModel.map(converteSingleElement)
  }

  indexToRow(index:number, arraySize:number){
    return Math.floor((index ) / arraySize) + 1
  }

  indexToColumn(index:number, arraySize:number){
    return (index ) % arraySize + 1;
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

