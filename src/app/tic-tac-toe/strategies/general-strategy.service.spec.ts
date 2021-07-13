import { TestBed } from '@angular/core/testing';

import { GeneralStrategyService, Parametrize } from './general-strategy.service';

import { BoardHandlerServiceService } from '../board-handler-service.service';
import { runTestSuit } from '../../shared/tests/jasmine_runTestsFromArray'
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

import { testSuitePattern_0_Cross, testSuitePattern_0_Circle } from './testCases/tests_0__0000_StrategyTestCases'
import { TestCasesCross, TestCasesCircles } from './testCases/tests_1_00_00_StrategyTestCases'
import { PatternSearcherService } from './pattern-searcher.service';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)


// foundElements: [[2, 1], [2, 1], [3, 1]],
// nextMoveProposals: [[1, 1], [1, 5]]

// parametrize(parameters: StrategyParameters):void{
//   this.nrOfElementsInRowToWin = parameters.nrOfElementsInRowToWin;
//   this.expectedNrOfGaps = parameters.expectedNrOfGaps;
//   this.maxGapSize = parameters.maxGapSize != undefined ? parameters.maxGapSize : 0;
//   this.shouldAfterPatternFieldBeEmpty = parameters.shouldAfterPatternFieldBeEmpty;
//   this.shouldBeforePatternFieldBeEmpty= parameters.shouldBeforePatternFieldBeEmpty;
//   this.nrOfSearchedFigures = parameters.nrOfSearchedFigures;
// }

let parametersFor_3_Strat_XX_X_ = {
  nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: true,
  shouldBeforePatternFieldBeEmpty: true,
  nrOfSearchedFigures: 3
}

@Parametrize(parametersFor_3_Strat_XX_X_)
export class Strategy3 extends GeneralStrategyService{

}

let testedFunction = function(figureToFind:FigureNotEmpty){
  return function(singleTestCase:TestCase){
    it(singleTestCase.name, () => {
      let boardInput = boardTranslator.createArrayOfCellDescirptors(singleTestCase.input);
      let nrOfFiguresInRowToWinn = 5;
      boardHandlerService.parametrize_ForTests(boardInput, 5);
      let patternSearcher = new PatternSearcherService(boardHandlerService);
      patternSearcher.parametrize(parametersFor_3_Strat_XX_X_)
      let solution = patternSearcher.getCalculatedStrategy(figureToFind, GeneralStrategyService);
      let foundPattern = solution.foundElements;
      let proposedMoves = solution.nextMoveProposals;
      let expOutput = <PatternDescriptor>singleTestCase.expectedOutput;
      expect(foundPattern).hasArraySameElements(expOutput.foundElements);
      expect(proposedMoves).hasArraySameElements(expOutput.nextMoveProposals);
      expect(1).toBeTruthy();
    })
  }
}


runTestSuit(testedFunction('Circle'), 'Find strategy 0 XXXX pattern: circle test instances', testSuitePattern_0_Circle);
runTestSuit(testedFunction('Cross'), 'Find strategy 0 XXXX pattern: cross test instances', testSuitePattern_0_Cross);

