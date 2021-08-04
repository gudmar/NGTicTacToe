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
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

let boardHandlerService = new BoardHandlerServiceService();
let testValidator = new TestCaseValidatorService()
let boardTranslator = new ArrayToBoardTranslatorService(testValidator)


let parametersForTestingSearchFromEachGap1 = {
  nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  // nrOfSearchedFigures: 3
  nrOfMissingFigures: 1
}

let parametersForTestingSearchFromEachGap2 = {
  nrOfElementsInRowToWin: 5,
  expectedNrOfGaps: 1,
  maxGapSize: 2,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfMissingFigures: 2
}

@Parametrize(parametersForTestingSearchFromEachGap1)
  class TestStartGaps1 extends GeneralStrategyService{
}

@Parametrize(parametersForTestingSearchFromEachGap2)
  class TestStartGaps2 extends GeneralStrategyService{
}

function symbolicArray2stringArray(arr: number[]): string[]{
  return arr.map((element: number) => {
    if (element == 0) return '';
    if (element == 1) return "Circle";
    return "Cross"
  })
}

let testFunction_listOfGapEndIndexes_1 = function(arraySlice: string[]){
  let testStratGaps1 = new TestStartGaps1();
  return  testStratGaps1.getGapIndexes(arraySlice)
}
let testFunction_listOfGapEndIndexes_2 = function(arraySlice: string[]){
  let testStratGaps2 = new TestStartGaps2();
  return  testStratGaps2.getGapIndexes(arraySlice)
}

xdescribe('Get indexes of gap endings from array slice', () => {
  let service: GeneralStrategyService;
  let testCase_0 = {
    input: [1, 0, 1, 0, 1, 1, 0, 1],
    expectedOutput: [1, 3, 6],
    testName: '0) 1 0 1 0 1 1 0 1'
  };
  let testCase_10 = {
    input: [0, 1, 0, 1, 1, 1, 1, 0],
    expectedOutput: [2],
    testName: '10) 0, 1, 0, 1, 1, 1, 1, 0 - only 2 should be discovered, as no element before any element appeared is not a gap, nore no element at the end is a gap'
  };
  let testCase_20 = {
    input: [0, 1, 0, 0, 1, 0, 1, 0],
    expectedOutput: [5],
    testName: '20) 0, 1, 0, 0, 1, 0, 1, 0 - only 5 should be discovered, first gap too large'
  };
  let testCase_30 = {
    input: [0, 2, 0, 2, 0, 1, 0, 2],
    expectedOutput: [2, 4, 6],
    testName: '30) 0, 2, 0, 2, 0, 1, 0, 2 - Mix circles with crosses. Shold be processed correctly.'
  };
  let testCase_40 = {
    input: [0, 2, 0, 0, 2, 1, 0, 0],
    expectedOutput: [],
    testName: '40) No gaps in this pattern shuld be discovered'
  };


  let testsToRun_gap1 = [testCase_0, testCase_10, testCase_20, testCase_30, testCase_40];
  
  let testCase_0a = {
    input: [1, 0, 1, 0, 1, 1, 0, 1],
    expectedOutput: [1, 3, 6],
    testName: '0a) 1 0 1 0 1 1 0 1 '
  };
  let testCase_10a = {
    input: [1, 0, 0, 0, 1, 0, 0, 1],
    expectedOutput: [6],
    testName: '0a) 1, 0, 0, 0, 1, 0, 0, 1 - index == 6, so end index of gap properly returned'
  };
  let testCase_20a = {
    input: [0, 1, 0, 0, 1, 0, 1, 0],
    expectedOutput: [3, 5],
    testName: '20a) 0, 1, 0, 0, 1, 0, 1, 0'
  };

  let testsToRun_gap2 = [testCase_0a, testCase_10a, testCase_20a]


  beforeEach(() => {
  });
  for (let test of testsToRun_gap1){
    let sliceArray:string[] = symbolicArray2stringArray(test.input)
    let result = testFunction_listOfGapEndIndexes_1(sliceArray)
    it(test.testName, () => {
      expect(result).toEqual(test.expectedOutput)
    })
  }
  
  for (let test of testsToRun_gap2){
    let sliceArray:string[] = symbolicArray2stringArray(test.input)
    let result = testFunction_listOfGapEndIndexes_2(sliceArray)
    it(test.testName, () => {
      expect(result).toEqual(test.expectedOutput)
    })
  }
});


// searchOneMoreTimeStartingFromEachGap(arraySlice: string[] = this.inputArraySlice, figure: FigureNotEmpty, nrOfElementsInRowToWin: number)



let parametersFor_XX_XX_patternFinder = {
  expectedNrOfGaps: 1,
  maxGapSize: 1,
  shouldAfterPatternFieldBeEmpty: false,
  shouldBeforePatternFieldBeEmpty: false,
  shouldBeforeOrAfterPatternFieldBeEmpty: false,
  nrOfMissingFigures: 1
}

@Parametrize(parametersFor_XX_XX_patternFinder)
  export class XX_XX_patternFinder extends GeneralStrategyService {
}


xdescribe('Find a pattern after a gap', () => {
  let patternFinder = new XX_XX_patternFinder();
  patternFinder.setNrOfFiguresInRowToWin(5);
  let testedFunction_5 = function(arraySlice: string[]){
    return patternFinder.searchOneMoreTimeStartingFromEachGap(arraySlice, "Circle", 5)
  }
  let testCase_0 = {
    input: [1, 0, 1, 0, 1, 1, 1],
    expectedOutput: {
      foundElements: [2, 4, 5, 6],
      nextMoveProposals: [3],
    },
    testName: '0) 1, 0, 1, 0, 1, 1, 1'
  }

  let testCase_10 = {
    input: [1, 1, 1, 0, 1, 1, 1],
    expectedOutput: {
      foundElements: [],
      nextMoveProposals: [],
    },
    testName: '10) 1, 1, 1, 0, 1, 1, 1 - return empty solution'
  }

  let testCase_20 = {
    input: [1, 1, 1, 0, 1, 1, 1],
    expectedOutput: {
      foundElements: [],
      nextMoveProposals: [],
    },
    testName: '20) 1, 1, 1, 0, 1, 0, 1 - return empty solution'
  }

  let testCase_30 = {
    input: [0, 1, 1, 0, 1, 1, 0],
    expectedOutput: {
      foundElements: [],
      nextMoveProposals: [],
    },
    testName: '30) 0, 1, 1, 0, 1, 1, 0 - return empty solution'
  }

  let testCase_40 = {
    input: [0, 2, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    expectedOutput: {
      foundElements: [3, 4, 6, 7],
      nextMoveProposals: [5],
    },
    testName: '40) 0, 2, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0 - should return first solution'
  }

  let testCase_50 = {
    input: [0, 2, 0, 2, 2, 0, 2, 2, 0, 1, 0, 1, 1, 1, 0],
    expectedOutput: {
      foundElements: [9, 11, 12, 13],
      nextMoveProposals: [10],
    },
    testName: '50) 0, 2, 0, 2, 2, 0, 2, 2, 0, 1, 0, 1, 1, 1, 0 - should return first non cross solution'
  }


  let testsToRun_1 = [testCase_0, testCase_10, testCase_20, testCase_30, testCase_40, testCase_50];

  for (let test of testsToRun_1){
    let sliceArray:string[] = symbolicArray2stringArray(test.input)
    let result = testedFunction_5(sliceArray)
    it(test.testName, () => {
      expect(result).toEqual(test.expectedOutput)
    })
  }
});

