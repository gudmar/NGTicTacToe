import { TestBed } from '@angular/core/testing';
import { TestCase } from '../../app.types'
import { BoardHandlerServiceService } from '../../tic-tac-toe/board-handler-service.service';
import { TestFromArrayConfig } from '../../app.types'



export class Jasmine_ServiceFunctionTestsFromArrayRunner implements TestFromArrayConfig{
    testSuiteName: string = '';
    // testedService: Function;
    testedFunction: any;
    testCaseArray: TestCase[];
    beforeEachCb: any = () => {};
    afterEachCb: any = () => {};
    constructor(testSuiteConfig: TestFromArrayConfig) {
        
        this.testSuiteName = testSuiteConfig.testSuiteName;
        this.testCaseArray = testSuiteConfig.testCaseArray;
        // this.testedService = testSuiteConfig.testedService;
        this.testedFunction = testSuiteConfig.testedFunction;
        this.beforeEachCb = testSuiteConfig.beforeEachCb;
        this.afterEachCb = testSuiteConfig.afterEachCb;
    }

    runSingleTest(singleTestCase: TestCase){
        let that = this;
        // let service = that.testedService;
        it(singleTestCase.name, () => {
            // TestBed.configureTestingModule({});
            // service = TestBed.inject(that.testedService);
            that.beforeEachCb();
            // let testedFunction = that.testedFunction;
            expect(that.testedFunction).toEqual(singleTestCase.expectedOutput)
        })
    }

    runTestSuit(testName: string, singleTestCase: TestCase){
        let that = this;
        describe(testName, () => {
            // beforeEach(() => {
            //     TestBed.configureTestingModule({});
            //     service = TestBed.inject(that.testedService);
            //     that.beforeEachCb();
            // });
            afterEach(() => {
                that.afterEachCb();
            })
            for (let test of that.testCaseArray){
                that.runSingleTest(test);
            }

        })
    }


}

describe('BoardHandlerServiceService', () => {
  let service: BoardHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});