import { TestBed } from '@angular/core/testing';

import { Strategy1_00_00Service } from './strategy1-00-00.service';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { runTestSuit } from '../../shared/tests/jasmine_runTestsFromArray'
import { TestCasesCircles } from './testCases/tests_1_00_00_StrategyTestCases'
import { ArrayToBoardTranslatorService } from '../../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../../shared/tests/test-case-validator.service'
import { TestCase, TestFromArrayConfig, Figure, FigureNotEmpty, PatternDescriptor} from '../../app.types'
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


let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      let nrOfFiguresInRowToWinn = 5;
      boardHandlerService.parametrize_ForTests(boardInput, 5);
      let patternSearcher = new PatternSearcherService(boardHandlerService);
      let sollution = patternSearcher.getCalculatedStrategy(figureToFind, Strategy1_00_00Service);
      let foundPattern = sollution.foundElements;
      let proposedMoves = sollution.nextMoveProposals;
      let expOutput = <PatternDescriptor>singleTestCase.expectedOutput;
      expect(foundPattern).hasArraySameElements(expOutput.foundElements);
      expect(proposedMoves).hasArraySameElements(expOutput.nextMoveProposals);
      expect(1).toBeTruthy();
    })
  }
}

// export interface PatternDescriptor {
//   foundElements: number[][],
//   nextMoveProposals: number[][],
// }

runTestSuit(testedFunction('Circle'), 'Find strategy 1 00_00 pattern: circle test instances', TestCasesCircles);


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
