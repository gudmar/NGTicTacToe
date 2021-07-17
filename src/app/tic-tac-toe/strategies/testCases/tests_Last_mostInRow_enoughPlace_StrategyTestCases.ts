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
        nextMoveProposals: [[4, 1], [4, 3], [4, 4], [4, 6], [4, 7]]
    }
};
let testCase10 = {
    name: '0) _ _ _ _ O _ O  in column: should find pattern and propose positions to move to.',
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


export let testCasesCircle = [testCase0, testCase10]