// 1 == 'Circle'
// 2 == 'Cross'
// 3 == ''




export let testCase1 = {
    name: '1) Matrix 7x7 find 4 circles in first row',
    input: [[0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[3, 1], [4, 1], [5, 1], [6, 1]],
        nextMoveProposals: [[2, 1], [7, 1]]
    }
};

export let  testSuitePattern_0_Circle = [testCase1];
// export let  testSuiteCross = [];




