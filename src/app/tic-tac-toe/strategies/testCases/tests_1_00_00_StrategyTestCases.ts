let testCase0 = {
    name: '0) Pattern with circles found in first row',
    input: [[0, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 1], [3, 1], [5, 1], [6, 1]],
        nextMoveProposals: [[4, 1]]
    }
};   
let testCase10 = {
    name: '10) Pattern with circles found in first row, start from first column, asymetric',
    input: [[1, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 1], [3, 1], [5, 1], [1, 1]],
        nextMoveProposals: [[4, 1]]
    }
};   
let testCase20 = {
    name: '20) Pattern with circles found in last row',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[3, 7], [5, 7], [6, 7], [7, 7]],
        nextMoveProposals: [[4, 7]]
    }
};  
let testCase30 = {
    name: '30) Pattern should not be found, as gap is not in the middle',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};  
let testCase40 = {
    name: '40) Pattern could be clasified to strategy 0, but should be discovered here as well: 0_0000',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 4], [3, 4], [4, 4], [5, 4]],
        nextMoveProposals: [[2, 4]]
    }
};  
let testCase50 = {
    name: '50) First column first row case',
    input: [[1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 2, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [1, 3], [1, 4], [1, 5]],
        nextMoveProposals: [[1, 2]]
    }
};  
let testCase60 = {
    name: '60) Last column last row case',
    input: [[1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [2, 0, 2, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1]],
    expectedOutput: {
        foundElements: [[7, 3], [7, 5], [7, 6], [7, 7]],
        nextMoveProposals: [[7, 4]]
    }
};  
let testCase70 = {
    name: '70) Shuld not be discovered as there are 2 gaps: last column',
    input: [[1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [2, 0, 2, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};  


export let TestCasesCircles = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, testCase60, testCase70]
// export let TestCasesCircles = [testCase70]