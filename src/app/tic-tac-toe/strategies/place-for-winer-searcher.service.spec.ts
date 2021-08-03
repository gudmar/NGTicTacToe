import { TestBed } from '@angular/core/testing';
import { BoardHandlerServiceService } from '../board-handler-service.service';
import { runTestSuit } from '../../shared/tests/jasmine_runTestsFromArray'
import { testCases } from './testCases/test_noOptionToWinn'
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


import { PlaceForWinerSearcherService } from './place-for-winer-searcher.service';
import { CanGameBeWonByAnyoneService } from './can-game-be-won-by-anyone.service';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)



let testedFunction = function(){
  return function(singleTestCase:TestCase, nrOfFiguresInRowToWinn: number){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      boardHandlerService.parametrize_ForTests(boardInput, nrOfFiguresInRowToWinn);
      let patternSearcher = new CanGameBeWonByAnyoneService(boardHandlerService);
      let solution = patternSearcher.getFirstWinningPatternCords();
      let foundPattern = solution.foundElements;
      let proposedMoves = solution.nextMoveProposals;
      let expOutput:PatternDescriptor = <PatternDescriptor>singleTestCase.expectedOutput;
      expect(foundPattern).hasArraySameElements(expOutput.foundElements);
      expect(proposedMoves).hasArraySameElements(expOutput.nextMoveProposals);

      expect(1).toBeTruthy();
    })
  }
}


runTestSuit(testedFunction(), 'Check if no possibility to winn component wrks correctly', testCases);


