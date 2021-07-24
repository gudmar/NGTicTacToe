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


let parametersFor_3_Strat_XX_X_ = {
  nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: true,
  nrOfSearchedFigures: 3
}

@Parametrize(parametersFor_3_Strat_XX_X_)
export class Strategy3 extends GeneralStrategyService{

}

