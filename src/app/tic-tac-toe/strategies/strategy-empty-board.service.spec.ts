import { TestBed } from '@angular/core/testing';

import { SingleRowEmptyBoardSearcher } from './strategy-empty-board.service';

import { BoardHandlerServiceService } from '../board-handler-service.service';
import { runTestSuit } from '../../shared/tests/jasmine_runTestsFromArray'
import { testCasesCircle } from './testCases/tests_Empty_board_strategy'
import { ArrayToBoardTranslatorService } from '../../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../../shared/tests/test-case-validator.service'
import { PatternDescriptor, TestCase, TestFromArrayConfig, Figure, FigureNotEmpty} from '../../app.types'
import { customMatchers } from '../../shared/tests/customMatchers'

import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import { ConcatSource } from 'webpack-sources';

import { PatternSearcherService } from './pattern-searcher.service';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)



let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase, nrOfFiguresInRowToWinn: number){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      boardHandlerService.parametrize_ForTests(boardInput, nrOfFiguresInRowToWinn);
      let patternSearcher = new PatternSearcherService(boardHandlerService);
      let sollution = patternSearcher.getCalculatedStrategy(figureToFind, 'strategy:empty');
      let foundPattern = sollution.foundElements;
      let proposedMoves = sollution.nextMoveProposals;
      let expOutput = <PatternDescriptor>singleTestCase.expectedOutput;
      expect(foundPattern).hasArraySameElements(expOutput.foundElements);
      expect(proposedMoves).hasArraySameElements(expOutput.nextMoveProposals);
      expect(1).toBeTruthy();
    })
  }
}



runTestSuit(testedFunction('Circle'), 'Empty Board solution finder tests', testCasesCircle);
