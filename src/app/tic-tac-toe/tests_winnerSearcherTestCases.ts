export let testCase1 = {
    name: 'Matrix 5x5 find 3 circles in last row',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0]],
    expectedOutput: [[2, 5], [3, 5], [4, 5]]
};
let testCase2 = {
    name: 'Matrix 5x5 find 3 crosses in first row',
    input: [[0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[3, 1], [4, 1], [5, 1]]
};
let testCase3 = {
    name: 'Matrix 5x5 find 3 crosses in first column',
    input: [[2, 0, 0, 0, 0],
            [2, 0, 0, 0, 0],
            [2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[1, 1], [1, 2], [1, 3]]
};
export let testCase4 = {
    name: 'Matrix 5x5 find 3 circles in third column',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]],
    expectedOutput: [[3, 3], [3, 4], [3, 5]]
};
export let testCase5 = {
    name: 'Matrix 5x5 find 3 circles in left top diagonal',
    input: [[1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[1, 1], [2, 2], [3, 3]]
};
export let testCase6 = {
    name: 'Matrix 5x5 find 3 circles in left bottom diagonal',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0]],
    expectedOutput: [[1, 5], [2, 4], [3, 3]]
}

export let  testSuiteCircle = [testCase1, testCase4, testCase5];
export let  testSuiteCross = [testCase2, testCase3];

