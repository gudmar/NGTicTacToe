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

import { Strategy00000Service } from './strategy-0--0000-.service';
import { PatternSearcherService } from './pattern-searcher.service';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)


// foundElements: [[2, 1], [2, 1], [3, 1]],
// nextMoveProposals: [[1, 1], [1, 5]]

let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      boardHandlerService.parametrize_ForTests(boardInput, 3);
      let patternSearcher = new PatternSearcherService(boardHandlerService);
      let sollution = patternSearcher.getCalculatedStrategy(figureToFind, Strategy00000Service);
      let foundPattern = sollution.foundElements;
      let proposedMoves = sollution.nextMoveProposals;
      expect(foundPattern).hasArraySameElements(singleTestCase.expectedOutput.foundElements);
      expect(proposedMoves).hasArraySameElements(singleTestCase.expectedOutput.nextMoveProposals);
      expect(1).toBeTruthy();
    })
  }
}

runTestSuit(testedFunction('Circle'), 'Find XXXX pattern in first row', []);


// describe('Strategy00000Service', () => {
//   let service: Strategy00000Service;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(Strategy00000Service);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
