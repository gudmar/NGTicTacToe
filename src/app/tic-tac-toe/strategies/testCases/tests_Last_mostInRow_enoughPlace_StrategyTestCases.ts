let testCase0 = {
    name: '0) _O_ _ O _ _ in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 5]],
        nextMoveProposals: [[4, 1], [4, 3], [4, 4], [4, 6]]
    }
};
let testCase10 = {
    name: '10) _ _ _ _ O _ O  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 5], [4, 7]],
        nextMoveProposals: [[4, 3], [4, 4], [4, 6]]
    }
};
let testCase20 = {
    name: '20) 0_ 0 _ _ _ _ _  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 1], [4, 3]],
        nextMoveProposals: [[4, 2], [4, 4], [4, 5]]
    }
};
let testCase30 = {
    name: '30) 0 _ _ _ 0 _ _ _  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 1], [4, 5]],
        nextMoveProposals: [[4, 2], [4, 3], [4, 4]]
    }
};
let testCase40 = {
    name: '40) 0 _ _ X 0 _ _ _  in column: should not return solution from column',
    input: [[0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 1]],
        nextMoveProposals: [[1,1],[2,1],[3,1],[5,1],[6,1],[7,1]]
    }
};
let testCase50 = {
    name: '50) 0 _ _ _ 0 1 2 _  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 1], [4, 5]],
        nextMoveProposals: [[4, 2], [4, 3], [4, 4]]
    }
};
let testCase60 = {
    name: '60) _ _ X 0 _ _ _ 0  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 3], [4, 7]],
        nextMoveProposals: [[4, 4], [4, 5], [4, 6]]
    }
};

let testCase70 = {
    name: '70) X 0 _ _ _ 0 X  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 6]],
        nextMoveProposals: [[4, 3], [4, 4], [4, 5]]
    }
};
let testCase80 = {
    name: '80) X _ 0 0 _ _ X  in column: should find pattern and propose positions to move to.',
    input: [[0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 3], [4, 4]],
        nextMoveProposals: [[4, 2], [4, 5], [4, 6]]
    }
};
let testCase90 = {
    name: `90) X 0 0 0 0 0 X  in column: a winning pattern. Should NOT return a winning pattern, as there is not place to move, should return 
    row solution, as winnig pattern should be discovered anyway in first strategy.`,
    input: [[0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2]],
        nextMoveProposals: [[1,2],[2,2],[3,2],[5,2],[6,2],[7,2]]
    }
};
let testCase100 = {
    name: '100) X 0 0 _ 0 0 X  in column: should return empty, as there is nowhere to move',
    input: [[0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 3], [4, 5], [4, 6]],
        nextMoveProposals: [[4, 4]]
    }
};
let testCase110 = {
    name: '110) _ 0 0 _ 0 0 _  in column: should return empty, as there is nowhere to move',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 3], [4, 5], [4, 6]],
        nextMoveProposals: [[4, 4]]
    }
};
let testCase120 = {
    name: '120) _ 0 0 _ 0 0 X  in column: should return empty, as there is nowhere to move',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 2], [4, 3], [4, 5]],
        nextMoveProposals: [[4, 4], [4, 1]]
    }
};
let testCase130 = {
    name: '130) _ _ 0 0 _ _ _  in column: should return empty, as there is nowhere to move',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[4, 3], [4, 4]],
        nextMoveProposals: [[4, 1], [4, 2], [4, 5], [4, 6], [4, 7]]
    }
};

/****************************************************************************************/

let testCase140 = {
    name: '140) _ _ _ _ _ _ _  Board is empty. First move: implement additional class for setting proposals to move. First move should be in the middle',
    input: [[0, 0, 0, 0, 0, 0, 0],
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

let testCase150 = {
    name: '150) _ X _ X X ...   some oposite figures: nothing returend as earlier strategies take care of those situations.',
    input: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

let testCase160 = {
    name: '160) 0 _ 0 _ 0 in 4 row should be chosen',
    input: [[0, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0],
            [0, 0, 2, 2, 2, 0, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 4], [4, 4], [6, 4]],
        nextMoveProposals: [[3, 4], [5, 4]]
    }
};

let testCase170 = {
    name: '170) 0 _ 0 _ 0 in 4 row should be chosen',
    input: [[0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [5, 3], [7, 5]],
        nextMoveProposals: [[4, 2], [6, 4]]
    }
};

export let testCasesCircle = [testCase0, testCase10, testCase20, testCase30, testCase40, testCase50, 
    testCase60, testCase70, testCase80, testCase90, testCase100, testCase110, testCase120, testCase130, testCase140, testCase150,
    testCase160, testCase170]
// export let testCasesCircle = [testCase170]