
import { TestBed } from '@angular/core/testing';
import { BoardHandlerServiceService } from './board-handler-service.service';
import { WinnerSearcherService } from './winner-searcher.service';
import { Jasmine_ServiceFunctionTestsFromArrayRunner } from '../shared/tests/jasmine_runTestsFromArray'
import { testSuiteCircle } from './tests_winnerSearcherTestCases'
import { testSuiteCross } from './tests_winnerSearcherTestCases'
import { TestFromArrayConfig } from '../app.types'
import { ArrayToBoardTranslatorService } from '../shared/tests/array-to-board-translator.service'
import { TestCaseValidatorService } from '../shared/tests/test-case-validator.service'

// describe('BoardHandlerServiceService', () => {
//   let service: BoardHandlerServiceService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BoardHandlerServiceService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

let boardHandlerService = new BoardHandlerServiceService();
let winnerSearcher = new WinnerSearcherService(boardHandlerService);
boardHandlerService.parametrize(5, 3);
let testValidator = new TestCaseValidatorService()
let testedFunctionCircle = () => {return winnerSearcher.getWinnerCords('Circle')}
let testedFunctionCross = () => {return winnerSearcher.getWinnerCords('Cross')}

let translatorConfigCircle =  {
  testSuiteName: 'Winner find testing: circle',
  testedFunction: testedFunctionCircle,
  testCaseArray: testSuiteCircle,
  beforeEachCb:()=>{},
  afterEachCb: ()=>{}
}
let translatorConfigCross =  {
  testSuiteName: 'Winner find testing: cross',
  testedFunction: testedFunctionCross,
  testCaseArray: testSuiteCross,
  beforeEachCb:()=>{},
  afterEachCb: ()=>{}
}

let boardTranslatorCircle = new ArrayToBoardTranslatorService(testValidator)
let boardTranslatorCross = new Jasmine_ServiceFunctionTestsFromArrayRunner(translatorConfigCross)

let testServiceRunnerCicrle = new Jasmine_ServiceFunctionTestsFromArrayRunner(translatorConfigCircle)
let testServiceRunnerCross = new Jasmine_ServiceFunctionTestsFromArrayRunner(translatorConfigCross)
