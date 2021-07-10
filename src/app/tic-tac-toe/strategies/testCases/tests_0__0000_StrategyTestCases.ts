// 1 == 'Circle'
// 2 == 'Cross'
// 3 == ''




export let testCase1 = {
    name: '1) Matrix 5x5 find 3 circles in first row',
    input: [[0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[2, 1], [2, 1], [3, 1]],
        nextMoveProposals: [[1, 1], [1, 5]]
    }
};

export let  testSuitePattern_0_Circle = [testCase1];
// export let  testSuiteCross = [];




