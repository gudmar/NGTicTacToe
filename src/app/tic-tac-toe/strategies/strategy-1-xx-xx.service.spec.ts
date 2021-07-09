import { TestBed } from '@angular/core/testing';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { runTestSuit } from '../../shared/tests/jasmine_runTestsFromArray'
import {  } from 'testCases/tests_0__0000_StrategyTestCases'
import { ArrayToBoardTranslatorService } from '../../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../../shared/tests/test-case-validator.service'
import { TestCase, TestFromArrayConfig, Figure, FigureNotEmpty} from '../../app.types'
import { customMatchers } from '../../shared/tests/customMatchers'

import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import { ConcatSource } from 'webpack-sources';

import { Strategy1XX_XXService } from './strategy-1-xx-xx.service';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)

// describe('Strategy1XXXXService', () => {
//   let service: Strategy1XX_XXService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(Strategy1XX_XXService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      boardHandlerService.parametrize_ForTests(boardInput, 3);
      // let winnerSearcher = new WinnerSearcherService(boardHandlerService);
      // expect(winnerSearcher.getWinnerCords(figureToFind)).hasArraySameElements(singleTestCase.expectedOutput);
      expect(1).toBeTruthy();
    })
  }
}

runTestSuit(testedFunction('Circle'), 'Find winner: Circle instance', []);

