let testCase0 = {
    name: '0) No one can win 5 in row - return [] []',
    input: [[1, 2, 1, 1, 1, 1, 2],
            [2, 2, 2, 1, 2, 2, 1],
            [2, 0, 1, 2, 1, 1, 2],
            [1, 1, 1, 2, 1, 1, 2],
            [2, 0, 0, 2, 1, 1, 2],
            [0, 0, 2, 1, 1, 0, 1],
            [2, 2, 1, 2, 2, 2, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

let testCase10 = {
    name: '10) No one can win 5 in row - return [] []',
    input: [[2, 0, 2, 1, 0, 2, 0],
            [2, 1, 2, 2, 1, 0, 0],
            [1, 2, 1, 1, 2, 0, 2],
            [0, 1, 2, 1, 2, 1, 1],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 0],
            [2, 2, 1, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

let testCase20 = {
    name: '20) Can win, X case',
    input: [[2, 0, 2, 1, 0, 2, 0],
            [2, 1, 2, 2, 1, 0, 0],
            [1, 2, 1, 1, 2, 0, 2],
            [0, 1, 2, 1, 2, 1, 0],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 0],
            [2, 2, 1, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[7, 3], [7, 7]],
        nextMoveProposals: [[7, 1], [7, 2], [7, 4], [7, 5], [7, 6]]
    }
};

let testCase30 = {
    name: '30) Can win, X case',
    input: [[2, 0, 2, 1, 0, 2, 0],
            [2, 1, 2, 2, 0, 0, 0],
            [1, 2, 1, 1, 2, 0, 2],
            [0, 1, 2, 1, 2, 1, 1],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 0],
            [2, 2, 1, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[3, 2], [4, 2]],
        nextMoveProposals: [[5, 2], [6, 2], [7, 2]]
    }
};

let testCase40 = {
    name: '40) Can win, O case',
    input: [[2, 0, 2, 1, 0, 2, 0],
            [2, 1, 2, 2, 1, 0, 0],
            [1, 2, 1, 1, 0, 0, 0],
            [0, 1, 2, 1, 2, 1, 1],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 0],
            [2, 2, 1, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[6,4],[5,5],[4,6],[3,7]],
        nextMoveProposals: [[7,3]]
    }
};

let testCase50 = {
    name: '50) Can win, O, X case, no overlap',
    input: [[2, 0, 2, 1, 0, 2, 0],
            [2, 1, 2, 2, 1, 0, 0],
            [1, 2, 1, 1, 0, 0, 0],
            [0, 1, 2, 1, 2, 1, 1],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 2, 2, 2, 0],
            [2, 2, 0, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[3, 3], [4, 3]],
        nextMoveProposals: [[5, 3], [6, 3], [7, 3]]
    }
};

let testCase60 = {
    name: '60) Can win, O, X case, overlap',
    input: [[2, 0, 2, 1, 0, 1, 0],
            [2, 1, 2, 2, 0, 0, 0],
            [1, 2, 1, 1, 2, 0, 2],
            [0, 1, 2, 1, 2, 1, 1],
            [0, 1, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 0],
            [2, 2, 1, 2, 0, 0, 2]],
    expectedOutput: {
        foundElements: [[6,1],[6,4],[6,5]],
        nextMoveProposals: [[6, 3], [6, 2], [6, 7]],
    }
};

let testCase70 = {
    name: '70) Empty board case',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1]],
        nextMoveProposals: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
        }
    //     foundElements: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], 
    //                     [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    //                     [1, 3], [2, 3], [3, 3], [4, 5], [5, 6],
    //                     [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
    //                     [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]],
    //     nextMoveProposals: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], 
    //                         [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    //                         [1, 3], [2, 3], [3, 3], [4, 5], [5, 6],
    //                         [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
    //                         [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]]
    // }
};

export let testCases = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, testCase60, testCase70]
