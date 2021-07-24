let testCase0 = {
    name: '0) Only one empty element on board, should be listed',
    input: [[1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[4, 4]],
        nextMoveProposals: [[4, 4]]
    }
};

let testCase10 = {
    name: '10) One empty and two empty. Should list two elements',
    input: [[1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[4, 6], [5, 6]],
        nextMoveProposals: [[4, 6], [5, 6]]
    }
};

let testCase20 = {
    name: '20) 1, 2, 3, 2 empty in row. Should list 3 elements',
    input: [[1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1]],
    expectedOutput: {
        foundElements: [[3, 5], [4, 5], [5, 5]],
        nextMoveProposals: [[3, 5], [4, 5], [5, 5]]
    }
};

let testCase30 = {
    name: '30) Boundry case: most empty fields in start, end position, diagonal',
    input: [[1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[1, 4], [2, 5], [3, 6], [4, 7]],
        nextMoveProposals: [[1, 4], [2, 5], [3, 6], [4, 7]]
    }
};

let testCase40 = {
    name: '40) Two sets of empty elements in one column. Should chose largest one. Boundry case',
    input: [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]],
    expectedOutput: {
        foundElements: [[14, 14], [13, 13], [12, 12], [11, 11], [10, 10]],
        nextMoveProposals: [[14, 14], [13, 13], [12, 12], [11, 11], [10, 10]]
    }
};

let testCase50 = {
    name: '50) Two sets of empty elements in one column. Should chose largest one. Middle of diagonal case',
    input: [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]],
    expectedOutput: {
        foundElements: [[6, 6], [7, 7], [8, 8], [9, 9], [10, 10]],
        nextMoveProposals: [[6, 6], [7, 7], [8, 8], [9, 9], [10, 10]]
    }
};

let testCase60 = {
    name: '60) Mixed up case. Solution should be found in column, however there are a lot of solutions in whole array.',
    input: [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 0, 0, 2, 0, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0, 0, 0, 2, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
            [1, 0, 0, 2, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]],
    expectedOutput: {
        foundElements: [[6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]],
        nextMoveProposals: [[6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]]
    }
};


export let  testCases = [testCase0, testCase10, testCase20, testCase30,]