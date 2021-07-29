let testCase0 = {
    name: '0) 1, 0, 1, 0, 1, 1, 0',
    input: [[1, 0, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [3, 1], [5, 1], [6, 1]],
        nextMoveProposals: [[2, 1], [4, 1]]
    }
};  

let testCase10 = {
    name: '10) 1, 1, 0, 1, 0, 1, 0',
    input: [[1, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [2, 1], [4, 1], [6, 1]],
        nextMoveProposals: [[3, 1], [5, 1], [6, 1]]
    }
};  

let testCase20 = {
    name: '20) 1, 1, 0, 1, 0, 1, 1',
    input: [[1, 1, 0, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [2, 1], [4, 1], [6, 1]],
        nextMoveProposals: [[3, 1], [5, 1], [6, 1]]
    }
};  

let testCase30 = {
    name: '0) 1, 1, 0, 1, 0, 1, 1',
    input: [[0, 1, 0, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [2, 1], [4, 1], [6, 1]],
        nextMoveProposals: [[3, 1], [5, 1]]
    }
};  

export let  testCases = [testCase0, testCase10, testCase20, testCase30]