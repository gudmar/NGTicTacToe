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
let testCase80 = {
    name: '80) 0000_0 in column test case',
    input: [[1, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [2, 0, 2, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
}; 
let testCase90 = {
    name: '90) Left top diagonal, 00_000 end',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1]],
    expectedOutput: {
        foundElements: [[2, 2], [3, 3], [5, 5], [6, 6]],
        nextMoveProposals: [[4, 4]]
    }
}; 

let testCase100 = {
    name: '100) Left Bottom diagonal, start, circle',
    input: [[0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[7, 1], [3, 5], [4, 4], [5, 3]],
        nextMoveProposals: [[6, 2]]
    }
}; 


export let TestCasesCircles = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, testCase60, testCase70, 
    testCase80, testCase90, testCase100]

let testCase0a = {
    name: '0a) Row Cross poluted',
    input: [[2, 0, 0, 0, 0, 0, 1],
            [0, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 1],
            [0, 2, 0, 2, 2, 2, 1],
            [0, 1, 1, 0, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[2, 6], [4, 6], [5, 6], [6, 6]],
        nextMoveProposals: [[3, 6]]
    }
};  
let testCase10a = {
    name: '10a) Column Cross poluted',
    input: [[2, 0, 0, 0, 0, 0, 1],
            [0, 2, 0, 2, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 2, 1, 1, 1],
            [0, 2, 0, 2, 2, 0, 2],
            [0, 1, 1, 0, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 3], [4, 5], [4, 6]],
        nextMoveProposals: [[4, 4]]
    }
};  
let testCase20a = {
    name: '20a) Left top diagonal, cross poluted',
    input: [[2, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 2, 0, 0, 0],
            [0, 0, 2, 1, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 2, 2, 1, 1],
            [0, 2, 0, 1, 2, 2, 2],
            [0, 1, 1, 0, 1, 1, 2]],
    expectedOutput: {
        foundElements: [[7, 7], [6, 6], [5, 5], [3, 3]],
        nextMoveProposals: [[4, 4]]
    }
};  
let testCase30a = {
    name: '30a) Left top diagonal, cross poluted',
    input: [[2, 0, 0, 0, 0, 0, 2],
            [0, 1, 0, 2, 0, 0, 0],
            [0, 0, 2, 1, 2, 0, 1],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 1, 2, 2, 2, 1, 1],
            [0, 1, 0, 1, 2, 2, 2],
            [0, 1, 1, 0, 1, 1, 1]],
    expectedOutput: {
        foundElements: [[7, 1], [5, 3], [4, 4], [3, 5]],
        nextMoveProposals: [[6, 2]]
    }
};  
let testCase40a = {
    name: '40a) Row, cross, too large gap',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 0, 2, 2, 2],
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
export let TestCasesCross = [testCase0a, testCase10a, testCase20a, testCase30a, testCase40a]    
// export let TestCasesCircles = [testCase100]