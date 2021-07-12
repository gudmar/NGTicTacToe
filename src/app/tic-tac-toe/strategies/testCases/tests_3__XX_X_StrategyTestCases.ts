let testCase0 = {
    name: '0) First row: find valid pattern',
    input: [[0, 0, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [4, 1], [6, 1]],
        nextMoveProposals: [[5, 1]]
    }
};  
let testCase10 = {
    name: '10) First row: not valid pattern: no free field on left',
    input: [[0, 2, 1, 1, 0, 1, 0],
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
    name: '20) First row: not valid pattern: no free field on left - too close to array left side',
    input: [[1, 1, 0, 1, 0, 0, 0],
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
let testCase30 = {
    name: '30) First row: not valid pattern: no free field on left - too close to array right side',
    input: [[0, 0, 0, 1, 1, 0, 1],
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
let testCase40 = {
    name: '40) First row: not valid pattern: no free field on left - right side occupied with circle',
    input: [[0, 0, 1, 1, 0, 1, 1],
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
let testCase50 = {
    name: '50) Last column, valid pattern',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[7, 2], [7, 4], [7, 5]],
        nextMoveProposals: [[7, 3]]
    }
};  

let testCase60 = {
    name: '60) Array start: left top diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 2], [4, 4], [5, 5]],
        nextMoveProposals: [[3, 3]]
    }
};  
let testCase61 = {
    name: '61) Left top diagonal, solution moved right',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 2], [5, 4], [6, 5]],
        nextMoveProposals: [[4, 3]]
    }
};  
let testCase70 = {
    name: '70) Array start: left bottom diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 1],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 6], [4, 4], [5, 3]],
        nextMoveProposals: [[3, 5]]
    }
}; 

let testCase80 = {
    name: '80) Array start: left bottom diagonal: solution not in first diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 1],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 6], [4, 5], [6, 3]],
        nextMoveProposals: [[5, 4]]
    }
}; 

export let testCasesCircle = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, testCase60, testCase61, testCase70, testCase80]

let testCase0a = {
    name: '0) First row: find valid pattern',
    input: [[0, 0, 2, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [4, 1], [6, 1]],
        nextMoveProposals: [[5, 1]]
    }
};  
let testCase10a = {
    name: '10a) First row: not valid pattern: no free field on left',
    input: [[0, 1, 2, 2, 0, 2, 0],
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
let testCase20a = {
    name: '20a) First row: not valid pattern: no free field on left - too close to array left side',
    input: [[2, 2, 0, 2, 0, 0, 0],
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
let testCase30a = {
    name: '30a) First row: not valid pattern: no free field on left - too close to array right side',
    input: [[0, 0, 0, 2, 2, 0, 2],
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
let testCase40a = {
    name: '40a) First row: not valid pattern: no free field on left - right side occupied with circle',
    input: [[0, 0, 2, 2, 0, 2, 2],
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
let testCase50a = {
    name: '50a) Last column, valid pattern',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[7, 2], [7, 4], [7, 5]],
        nextMoveProposals: [[7, 3]]
    }
};  

let testCase60a = {
    name: '60a) Array start: left top diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 2], [4, 4], [5, 5]],
        nextMoveProposals: [[3, 3]]
    }
};  
let testCase61a = {
    name: '61a) Left top diagonal, solution moved right',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 2, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 2], [5, 4], [6, 5]],
        nextMoveProposals: [[4, 3]]
    }
};  
let testCase70a = {
    name: '70a) Array start: left bottom diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 1],
            [0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 6], [4, 4], [5, 3]],
        nextMoveProposals: [[3, 5]]
    }
}; 

let testCase80a = {
    name: '80a) Array start: left bottom diagonal: solution not in first diagonal',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 1],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 6], [4, 5], [6, 3]],
        nextMoveProposals: [[5, 4]]
    }
}; 

export let testCasesCross = [testCase0a, testCase10a, testCase20a, testCase30a, testCase40a, testCase50a, testCase60a, testCase61a, testCase70a, testCase80a]