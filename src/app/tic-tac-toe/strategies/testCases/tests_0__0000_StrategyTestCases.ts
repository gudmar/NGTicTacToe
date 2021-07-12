// 1 == 'Circle'
// 2 == 'Cross'
// 3 == ''




export let testCase1 = {
    name: '1) Matrix 7x7 find 4 circles in first row',
    input: [[0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [4, 1], [5, 1], [6, 1]],
        nextMoveProposals: [[2, 1], [7, 1]]
    }
};
let testCase2 = {
    name: '2) Matrix 7x7 find 4 circles in first column',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 2], [1, 3], [1, 4], [1, 5]],
        nextMoveProposals: [[1, 1], [1, 6]]
    }
};
let testCase3 = {
    name: '3) Matrix 7x7 find 4 circles leftTopDiagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 2], [3, 3], [4, 4], [5, 5]],
        nextMoveProposals: [[1, 1], [6, 6]]
    }
};
let testCase4 = {
    name: '4) Matrix 7x7 find 4 circles leftBottomDiagonal: first row polluted with circles',
    input: [[0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 6], [3, 5], [4, 4], [5, 3]],
        nextMoveProposals: [[1, 7], [6, 2]]
    }
};
let testCase5 = {
    name: '5) Matrix 7x7 find 4 circles in first row, starting from first column',
    input: [[1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [2, 1], [3, 1], [4, 1]],
        nextMoveProposals: [[5, 1]]
    }
};
let testCase6 = {
    name: '6) Matrix 7x7 find 4 circles in first row, cross before first circle',
    input: [[2, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[5, 1], [2, 1], [3, 1], [4, 1]],
        nextMoveProposals: [[6, 1]]
    }
};
let testCase7 = {
    name: '7) Matrix 7x7 find 4 circles in first row, cross after last circle',
    input: [[0, 1, 1, 1, 1, 2, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[5, 1], [2, 1], [3, 1], [4, 1]],
        nextMoveProposals: [[1, 1]]
    }
};
let testCase8 = {
    name: '8) Matrix 7x7 find 4 circles in first row, crosses after and before pattern',
    input: [[2, 1, 1, 1, 1, 2, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase9 = {
    name: '9) Nearly 4 on 7x7 board in first row',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase10 = {
    name: '10) Pattern of Circles in last row finishing in last column, poluted with not finished patterns',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 1],
            [0, 1, 0, 1, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[4, 7], [5, 7], [6, 7], [7, 7]],
        nextMoveProposals: [[3, 7]]
    }
};
let testCase11 = {
    name: '11) Pattern of Circles in last row staring first column, poluted with not finished patterns',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1]],
    expectedOutput: {
        foundElements: [[1, 7], [2, 7], [3, 7], [4, 7]],
        nextMoveProposals: [[5, 7]]
    }
};

let testCase12 = {
    name: '12) Pattern of Circles in last column staring first column, poluted with not finished patterns',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1],
            [0, 0, 2, 2, 1, 0, 1],
            [0, 0, 2, 0, 1, 0, 0],
            [0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [[7, 1], [7, 2], [7, 3], [7, 4]],
        nextMoveProposals: [[7, 5]]
    }
};
let testCase13 = {
    name: '13) Pattern of Circles in last column finishing in last column, poluted with not finished patterns',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 0],
            [0, 0, 2, 2, 1, 0, 1],
            [0, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [[7, 7], [7, 6], [7, 5], [7, 4]],
        nextMoveProposals: [[7, 3]]
    }
};
let testCase14 = {
    name: '14) Pattern in last column ending in last row not existing due to lack of free field for sollution',
    input: [[0, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 2],
            [0, 0, 2, 2, 1, 0, 1],
            [0, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

let testCase15 = {
    name: '15) Pattern in first column ending in last row, Circle, polluted with not finished solutions',
    input: [[2, 1, 0, 1, 1, 2, 1],
            [2, 2, 2, 0, 0, 1, 1],
            [0, 1, 0, 1, 1, 0, 2],
            [1, 0, 2, 2, 1, 0, 2],
            [1, 0, 2, 0, 1, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [[1, 7], [1, 6], [1, 5], [1, 4]],
        nextMoveProposals: [[1, 3]]
    }
};

let testCase16 = {
    name: '16) Pattern in first column not existing because it is a winner pattern, not a nearly winner - end in last row',
    input: [[2, 1, 0, 1, 1, 2, 1],
            [0, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 2],
            [1, 0, 2, 2, 1, 0, 2],
            [1, 0, 2, 0, 1, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase17 = {
    name: '17) Pattern in first column not existing because it is a winner pattern, not a nearly winner - from first row',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 2],
            [1, 0, 2, 2, 1, 0, 2],
            [1, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase18 = {
    name: '18) Pattern in last column not existing because it is a winner pattern, not a nearly winner - from first row',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 2, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1],
            [1, 0, 2, 2, 1, 0, 1],
            [2, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 0, 0],
            [1, 1, 0, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase19 = {
    name: '19) Pattern in top left diagonal from diagonal start, plus patterns that should not be discovered',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 1, 2, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 0, 2, 1, 1, 0, 1],
            [2, 0, 2, 0, 0, 0, 1],
            [0, 0, 2, 0, 0, 1, 0],
            [1, 1, 1, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [[1, 1], [2, 2], [3, 3], [4, 4]],
        nextMoveProposals: [[5, 5]]
    }
};
let testCase20 = {
    name: '20) Pattern in top left diagonal at diagonal end, plus patterns that should not be discovered',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 1, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1],
            [1, 0, 2, 1, 1, 0, 1],
            [2, 0, 2, 0, 1, 0, 1],
            [0, 0, 2, 0, 0, 1, 0],
            [1, 1, 1, 1, 2, 1, 1]],
    expectedOutput: {
        foundElements: [[7, 7], [6, 6], [5, 5], [4, 4]],
        nextMoveProposals: [[3, 3]]
    }
};

let testCase21 = {
    name: '21) Pattern in bottom left diagonal at diagonal start, plus patterns that should not be discovered',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 1, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 1],
            [1, 0, 2, 1, 1, 0, 1],
            [2, 0, 1, 0, 1, 0, 1],
            [0, 1, 2, 0, 0, 1, 0],
            [1, 1, 1, 0, 2, 1, 0]],
    expectedOutput: {
        foundElements: [[1, 7], [2, 6], [3, 5], [4, 4]],
        nextMoveProposals: [[5, 3]]
    }
};
let testCase22 = {
    name: '22) Pattern in bottom left diagonal at diagonal end, plus patterns that should not be discovered',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 1, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1],
            [1, 0, 2, 1, 1, 0, 1],
            [2, 0, 0, 0, 1, 0, 1],
            [0, 1, 2, 0, 0, 1, 0],
            [1, 1, 1, 0, 2, 1, 0]],
    expectedOutput: {
        foundElements: [[7, 1], [6, 2], [5, 3], [4, 4]],
        nextMoveProposals: [[3, 5]]
    }
};
let testCase23 = {
    name: '23) Pattern in bottom left diagonal No pattern found due to winner pattern',
    input: [[1, 1, 0, 1, 1, 2, 1],
            [1, 1, 2, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1],
            [1, 0, 2, 1, 1, 0, 1],
            [2, 0, 1, 0, 1, 0, 1],
            [0, 1, 2, 0, 0, 1, 0],
            [1, 1, 1, 0, 2, 1, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};
let testCase24 = {
    name: '24) 2 patterns (in row and col) found, one shuld be returned (row one due to implementation order)',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 2, 1],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 4], [3, 4], [4, 4], [5, 4]],
        nextMoveProposals: [[1, 4]]
    }
};

let testCase25 = {
    name: '24) 2 patterns in one row: first should be returned',
    input: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 13], [2, 13], [3, 13], [4, 13]],
        nextMoveProposals: [[5, 13]]
    }
};

let testCase26 = {
    name: '26) In last row there is a winning pattern, that comes first, and a pattern to be found that is second. Second pattern should be found',
    input: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[7, 13], [8, 13], [9, 13], [10, 13]],
        nextMoveProposals: [[6, 13], [11, 13]]
    }
};

export let  testSuitePattern_0_Circle = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, testCase7, testCase8, testCase9, 
            testCase10, testCase11, testCase12, testCase13, testCase14, testCase15, testCase16, testCase17, testCase18, testCase19, testCase20,
            testCase21, testCase22, testCase23, testCase24, testCase25, testCase26];


let testCase1a = {
    name: '1a) pattern in left bottom diagonal should be found, one in top left diagonal is a winnig pattern, so shuld not be discovered',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 2, 0, 2, 0, 0],
            [0, 2, 0, 0, 0, 2, 0],
            [2, 0, 0, 0, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[1, 7], [2, 6], [3, 5], [4, 4]],
        nextMoveProposals: [[5, 3]]
    }
};    
let testCase2a = {
    name: '2a) pattern in last row to be found, polluted with part sollutions that should not be discovered',
    input: [[1, 1, 1, 1, 0, 2, 2],
            [0, 0, 0, 0, 0, 2, 0],
            [2, 0, 0, 0, 2, 0, 0],
            [0, 0, 1, 2, 2, 2, 2],
            [2, 0, 2, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 2, 2, 2, 2]],
    expectedOutput: {
        foundElements: [[7, 7], [6, 7], [5, 7], [4, 7]],
        nextMoveProposals: [[3, 7]]
    }
};           
let testCase3a = {
    name: '3a) Firs pattern in top left diagonal should not be discovered, no free field, second should be found: cross',
    input: [[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[6, 6], [7, 7], [8, 8], [9, 9]],
        nextMoveProposals: [[10, 10]]
    }
};  
let testCase4a = {
    name: '3a) First pattern in top left diagonal should not be noticed, second, ending diagonal should be found',
    input: [[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
            [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[13, 13], [12, 12], [11, 11], [10, 10]],
        nextMoveProposals: [[9, 9]]
    }
};  
export let testSuitePattern_0_Cross = [testCase1a, testCase2a, testCase3a, testCase4a];
// export let testSuitePattern_0_Cross = [testCase3a];





