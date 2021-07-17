let testCase0 = {
    name: '0) First row _XXX_)',
    input: [[0, 1, 1, 1, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 1], [3, 1],[4, 1]],
        nextMoveProposals: [[1, 1], [5, 1]]
    }
};
let testCase10 = {
    name: '10) |XXX_ should not be found',
    input: [[1, 1, 1, 0, 0, 0, 2],
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
let testCase20 = {
    name: '20) |XXX_ should not be found diagonal case',
    input: [[1, 1, 0, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

let testCase30 = {
    name: '30) _XXX_ should be found - diagonal left bottom',
    input: [[1, 1, 0, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 6], [4, 5], [5, 4]],
        nextMoveProposals: [[2, 7], [6, 3]]
    }
};

export let testCasesCircle = [testCase0, testCase10, testCase20, testCase30]