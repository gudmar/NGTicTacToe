
import { TestBed } from '@angular/core/testing';
import { BoardHandlerServiceService } from './board-handler-service.service';
import { WinnerSearcherService } from './winner-searcher.service';
import { Jasmine_ServiceFunctionTestsFromArrayRunner } from '../shared/tests/jasmine_runTestsFromArray'
import { testCase1, testCase4, testCase5, testCase6, testSuiteCircle, testSuiteCross } from './tests_winnerSearcherTestCases'
import { ArrayToBoardTranslatorService } from '../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../shared/tests/test-case-validator.service'
import { TestCase, TestFromArrayConfig, Figure, FigureNotEmpty} from '../app.types'

import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;


declare global {
  namespace jasmine {
      interface Matchers<T> {
          hasArraySameElements(expected: any, expectationFailOutput?: any): boolean;
      }
  }
}

var customMatchers = {
  hasArraySameElements: function(){
    return {
      compare: function(inputArray: any[], expectedResultArray: any[]){
        console.log(`%cInput of test is ${JSON.stringify(inputArray)}`, 'background-color: red; color: white;')
        console.log(`%cExpected result is ${JSON.stringify(expectedResultArray)}`, 'background-color: red; color: white;')
        let result = {pass:false, message: ''}
        let arrInputLenght = inputArray.length;
        let arrExpectedLenght = expectedResultArray.length;
        let flatCompareArrays = function(arr1: any[], arr2: any[]):boolean {
          let len1 = arr1.length;
          let len2 = arr2.length;
          if (len1 != len2) {
            console.log(`Elements lenght unequal`)
            return false;
          }
          for (let i = 0; i < len1; i++){
            if (arr1[i] != arr2[i]) return false
          }
          return true;
        }
        let getIndexOfElementInArray = function(searchedArr: any[], element: any) {
          let index = -1;
          searchedArr.forEach((el:any, i:number) => {
            if (flatCompareArrays(el, element)) index = i;
          });
          return index;
        }
        if (arrInputLenght != expectedResultArray.length) return {pass: false, message: 'Arrays unequal'}
        for (let inputElement of inputArray) {
          let foundIndex = getIndexOfElementInArray(expectedResultArray, (inputElement));
          if (foundIndex == -1) return {pass: false, message: `Element ${inputElement} not found`}
          expectedResultArray.splice(foundIndex, 1);
        }
        return {pass: true, message: 'Arrays are equal'}
      }
    }
  }
}

describe('Winner searcher service', () => {
  let service: WinnerSearcherService;
  let boardHandlerService = new BoardHandlerServiceService();
  let testValidator = new TestCaseValidatorService()
  let boardTranslator = new ArrayToBoardTranslatorService(testValidator)
  let test1 = testCase1
  let test4 = testCase4;
  let test5 = testCase5;
  let test6 = testCase6;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(BoardHandlerServiceService);
  });

  it(test1.name, () => {
    let boardInput = boardTranslator.createArrayOfCellDescirptors(test1.input);
    boardHandlerService.parametrize_ForTests(boardInput, 3);
    let winnerSearcher = new WinnerSearcherService(boardHandlerService);
    console.dir(boardHandlerService)
    console.dir(winnerSearcher)
    console.dir(winnerSearcher.getWinnerCords('Circle'))
    expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test1.expectedOutput);
  }); 
  it(test4.name, () => {
    let boardInput = boardTranslator.createArrayOfCellDescirptors(test4.input);
    boardHandlerService.parametrize_ForTests(boardInput, 3);
    let winnerSearcher = new WinnerSearcherService(boardHandlerService);
    console.dir(boardHandlerService)
    console.dir(winnerSearcher)
    console.dir(winnerSearcher.getWinnerCords('Circle'))
    expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test4.expectedOutput);
  }); 
  it(test5.name, () => {
    let boardInput = boardTranslator.createArrayOfCellDescirptors(test5.input);
    boardHandlerService.parametrize_ForTests(boardInput, 3);
    let winnerSearcher = new WinnerSearcherService(boardHandlerService);
    console.dir(boardHandlerService)
    console.dir(winnerSearcher)
    console.dir(winnerSearcher.getWinnerCords('Circle'))
    expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test5.expectedOutput);
  }); 
  it(test6.name, () => {
    let boardInput = boardTranslator.createArrayOfCellDescirptors(test6.input);
    boardHandlerService.parametrize_ForTests(boardInput, 3);
    let winnerSearcher = new WinnerSearcherService(boardHandlerService);
    console.dir(boardHandlerService)
    console.dir(winnerSearcher)
    console.dir(winnerSearcher.getWinnerCords('Circle'))
    expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test6.expectedOutput);
  }); 
});



// function testedFunctionFactory(figrueToBeUsedInTests: FigureNotEmpty, singleTestDescriptor: TestCase): {testedFunction:Function}{
//   let boardHandlerService = new BoardHandlerServiceService();
//   let testValidator = new TestCaseValidatorService()
//   let boardTranslator = new ArrayToBoardTranslatorService(testValidator)
//   return {
//     testedFunction: function(singleTestDescriptor: TestCase): number[][] {
//       boardHandlerService.parametrize_ForTests(boardTranslator.createArrayOfCellDescirptors(singleTestDescriptor.input), 3);
//       let winnerSearcher = new WinnerSearcherService(boardHandlerService);
//       return winnerSearcher.getWinnerCords(figrueToBeUsedInTests);
//     }
//   }
// }

// let testedFunctionCircle = (singleTestDescriptor: TestCase) => { return testedFunctionFactory('Circle', singleTestDescriptor) }
// let testedFunctionCross = (singleTestDescriptor: TestCase) => { return testedFunctionFactory('Cross', singleTestDescriptor) }

// let translatorConfigCircle =  {
//   testSuiteName: 'Winner find testing: circle',
//   testedFunction: testedFunctionCircle,
//   testCaseArray: testSuiteCircle,
//   beforeEachCb:()=>{},
//   afterEachCb: ()=>{}
// }
// let translatorConfigCross =  {
//   testSuiteName: 'Winner find testing: cross',
//   testedFunction: testedFunctionCross,
//   testCaseArray: testSuiteCross,
//   beforeEachCb:()=>{},
//   afterEachCb: ()=>{}
// }





// let testServiceRunnerCicrle = new Jasmine_ServiceFunctionTestsFromArrayRunner(translatorConfigCircle)
// let testServiceRunnerCross = new Jasmine_ServiceFunctionTestsFromArrayRunner(translatorConfigCross)

// testServiceRunnerCicrle.runTestSuit("Search for circle winners", testSuiteCircle)
// testServiceRunnerCross.runTestSuit("Search for cross winners", testSuiteCross)




