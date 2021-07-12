let testCase0 = {
    name: 'Pattern with circles found in first row',
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

export let TestCasesCircles = [testCase0]