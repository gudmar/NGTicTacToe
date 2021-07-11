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


export let  testSuitePattern_0_Circle = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, testCase7, testCase8];
// export let  testSuiteCross = [];




