export let testCase0 = {
    name: '1) No empty space, should return [] []',
    input: [[2, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 2],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1]],
    expectedOutput: {
        foundElements: [],
        nextMoveProposals: []
    }
};

export let testCase10 = {
    name: '1) Should return empty spaces',
    input: [[0, 1, 1, 1, 1, 1, 0],
            [2, 1, 1, 1, 1, 1, 2],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 0, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 2, 2, 1],
            [0, 1, 2, 1, 2, 2, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [7, 1], [4, 4], [1, 7], [7, 7]],
        nextMoveProposals: [[1, 1], [7, 1], [4, 4], [1, 7], [7, 7]]
    }
};