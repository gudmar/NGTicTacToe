let testCase0 = {
    name: '0) First row OXX_XXO)',
    input: [[2, 1, 1, 0, 1, 1, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 1], [3, 1],[5, 1], [6, 1]],
        nextMoveProposals: [[4, 1]]
    }
};  
let testCase10 = {
    name: '10) Third row _XX_XX_)',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 3], [3, 3],[5, 3], [6, 3]],
        nextMoveProposals: [[4, 3]]
    }
};  
let testCase20 = {
    name: '20) Third row _X_XXX_)',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 3], [4, 3],[5, 3], [6, 3]],
        nextMoveProposals: [[3, 3]]
    }
};  
let testCase30 = {
    name: '30) Diagonal |XX_XX|)',
    input: [[0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [4, 2],[6, 4], [7, 5]],
        nextMoveProposals: [[5, 3]]
    }
};
let testCase40 = {
    name: '40) Column should not find: too much gaps',
    input: [[0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 2, 2, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};  
let testCase50 = {
    name: '50) Diagonal Left bottom |XXX_X|)',
    input: [[0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 5], [2, 4],[3, 3], [5, 1]],
        nextMoveProposals: [[4, 2]]
    }
};
let testCase60 = {
    name: '60) Real example from game |XXX_X|)',
    input: [[0, 0, 1, 2, 2, 2, 2],
            [0, 0, 1, 2, 0, 1, 0],
            [0, 0, 2, 2, 1, 2, 2],
            [1, 2, 1, 1, 1, 2, 1],
            [1, 0, 1, 0, 1, 1, 1],
            [0, 2, 2, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 5], [5, 5],[6, 5], [7, 5]],
        nextMoveProposals: [[4, 5]]
    }
};


export let testCasesCircle = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, testCase60]
// export let testCasesCircle = [testCase60]