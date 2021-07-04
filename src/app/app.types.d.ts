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
 
export interface TestCase{
  name: string,
  input: number[][],
  expectedOutput: CellCords[]
}
