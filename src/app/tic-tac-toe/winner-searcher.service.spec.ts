
import { TestBed } from '@angular/core/testing';
import { BoardHandlerServiceService } from './board-handler-service.service';
import { WinnerSearcherService } from './winner-searcher.service';
import { runTestSuit } from '../shared/tests/jasmine_runTestsFromArray'
import { testCase1, testCase4, testCase5, testCase6, testSuiteCircle, testSuiteCross } from './tests_winnerSearcherTestCases'
import { ArrayToBoardTranslatorService } from '../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../shared/tests/test-case-validator.service'
import { TestCase, TestFromArrayConfig, Figure, FigureNotEmpty} from '../app.types'
import { customMatchers } from '../shared/tests/customMatchers'

import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import { ConcatSource } from 'webpack-sources';


let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)


let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      boardHandlerService.parametrize_ForTests(boardInput, 3);
      let winnerSearcher = new WinnerSearcherService(boardHandlerService);
      expect(winnerSearcher.getWinnerCords(figureToFind)).hasArraySameElements(singleTestCase.expectedOutput);
    })
  }
}

// runTestSuit(testedFunction('Circle'), 'Find winner: Circle instance', testSuiteCircle);
// runTestSuit(testedFunction('Cross'), 'Find winner: Circle instance', testSuiteCross);













// describe('Winner searcher service', () => {
//   let service: WinnerSearcherService;
//   let boardHandlerService = new BoardHandlerServiceService();
//   let testValidator = new TestCaseValidatorService()
//   let boardTranslator = new ArrayToBoardTranslatorService(testValidator)


//   beforeEach(() => {
//     jasmine.addMatchers(customMatchers);
//     // TestBed.configureTestingModule({});
//     // service = TestBed.inject(BoardHandlerServiceService);
//   });
//   for (let test of testArray) {
//     it (test.name, () => {
//     let boardInput = boardTranslator.createArrayOfCellDescirptors(test.input);
//     boardHandlerService.parametrize_ForTests(boardInput, 3);
//     let winnerSearcher = new WinnerSearcherService(boardHandlerService);
//     expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test.expectedOutput);      
//     })
//   }



  // it(test1.name, () => {
  //   let boardInput = boardTranslator.createArrayOfCellDescirptors(test1.input);
  //   boardHandlerService.parametrize_ForTests(boardInput, 3);
  //   let winnerSearcher = new WinnerSearcherService(boardHandlerService);
  //   expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test1.expectedOutput);
  // }); 
  // it(test4.name, () => {
  //   let boardInput = boardTranslator.createArrayOfCellDescirptors(test4.input);
  //   boardHandlerService.parametrize_ForTests(boardInput, 3);
  //   let winnerSearcher = new WinnerSearcherService(boardHandlerService);
  //   expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test4.expectedOutput);
  // }); 
  // it(test5.name, () => {
  //   let boardInput = boardTranslator.createArrayOfCellDescirptors(test5.input);
  //   boardHandlerService.parametrize_ForTests(boardInput, 3);
  //   let winnerSearcher = new WinnerSearcherService(boardHandlerService);
  //   expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test5.expectedOutput);
  // }); 
  // it(test6.name, () => {
  //   let boardInput = boardTranslator.createArrayOfCellDescirptors(test6.input);
  //   boardHandlerService.parametrize_ForTests(boardInput, 3);
  //   let winnerSearcher = new WinnerSearcherService(boardHandlerService);
  //   expect(winnerSearcher.getWinnerCords('Circle')).hasArraySameElements(test6.expectedOutput);
  // }); 
// });



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




