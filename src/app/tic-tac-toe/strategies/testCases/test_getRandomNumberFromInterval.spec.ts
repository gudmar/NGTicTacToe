import { PatternSearcherService } from '../pattern-searcher.service';
import { TestBed } from '@angular/core/testing';

let testedFunction: Function = PatternSearcherService.getRandomNumberFromInterval



describe('Test if getRandomNumberFromInterval returns a number from iterval, including start position, not including end position', () => {
//   let service: BoardSimplifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject();
  });

  it('getRandomNumberFromInterval(0, 1) should always return 0, never 1', () => {
      for(let i = 0; i < 100; i++){
        expect(testedFunction(0, 1)).toBe(0);
      }
  });

  it('getRandomNumberFromInterval(5, 10) should always return value greater equal to 5, less than 10', () => {
    for(let i = 0; i < 500; i++){
        let randomlySelectedValue = testedFunction(5, 10);
        expect(randomlySelectedValue).toBeGreaterThanOrEqual(5);
        expect(randomlySelectedValue).toBeLessThan(10);
    }
  });


});