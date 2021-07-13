export type Figure = 'Circle' | 'Cross' | '';

export interface CellDescriptor{
  figure: Figure,
  id: number,
  row: number,
  column: number,
  isPartOfWinningPlot: boolean,
  isOccupied: boolean,
  onclick: () => void
}

export type CellCords = number[];


export type FigureNotEmpty = 'Circle' | 'Cross';

export type Receiver = (signal: string) => void;

export interface PatternDescriptor {
  foundElements: number[][],
  nextMoveProposals: number[][],
}
 
export interface TestCase{
  name: string,
  input: number[][],
  expectedOutput: CellCords[] | PatternDescriptor
}

export interface TestFromArrayConfig {
  testSuiteName: string,
  testedFunction: Function,
  testCaseArray: TestCase[],
  beforeEachCb?: Function,
  afterEachCb?: Function
}

export interface SlicedPatternDescriptor {
  foundElements: number[],
  nextMoveProposals: number[]
}

export interface StrategyImplementator {
  simplifiedArrayToSerachIn: string[],
  foundIndexMemory: number[],
  nrOfFoundInRow: number,
  maxNrOfFoundInRowSoFar: number,
  maxNrOfFoundInRowIndexMemory:number[],
  nrOfElementsInRowToWin:number,
  figure: FigureNotEmpty,
  constructor: Function,
  clearThisInstanceMemory: Function,
  checkIfPatternFound: Function,
  isThereAMovePossible: Function,
  getListOfIndexesOfProposedMoves: Function,
  isFieldEmptyAndInBoundries: Function,
  isAWinnerPattern?: Function,
  getFoundPatternIndexes: Function,
  getPattern: Function
}

export interface StrategyParameters {
  nrOfElementsInRowToWin:number,
  expectedNrOfGaps:number,
  maxGapSize?: number,
  shouldBeforePatternFieldBeEmpty: boolean,
  shouldAfterPatternFieldBeEmpty: boolean,
  nrOfSearchedFigures: number
}
