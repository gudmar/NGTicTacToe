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
    name: '16) Pattern in first column not existing because it is a winner pattern, not a nearly winner',
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

export let  testSuitePattern_0_Circle = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, testCase7, testCase8, testCase9, 
            testCase10, testCase11, testCase12, testCase13, testCase14, testCase15, testCase16];

// export let  testSuitePattern_0_Circle = [testCase16];




