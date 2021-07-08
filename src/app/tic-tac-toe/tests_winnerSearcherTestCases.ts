export let testCase1 = {
    name: '1) Matrix 5x5 find 3 circles in last row',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0]],
    expectedOutput: [[2, 5], [3, 5], [4, 5]]
};
let testCase2 = {
    name: '2) Matrix 5x5 find 3 crosses in first row',
    input: [[0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[3, 1], [4, 1], [5, 1]]
};
let testCase3 = {
    name: '3) Matrix 5x5 find 3 crosses in first column',
    input: [[2, 0, 0, 0, 0],
            [2, 0, 0, 0, 0],
            [2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[1, 1], [1, 2], [1, 3]]
};
export let testCase4 = {
    name: '4) Matrix 5x5 find 3 circles in third column',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]],
    expectedOutput: [[3, 3], [3, 4], [3, 5]]
};
export let testCase5 = {
    name: '5) Matrix 5x5 find 3 circles in left top diagonal',
    input: [[1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[1, 1], [2, 2], [3, 3]]
};
export let testCase6 = {
    name: '6) Matrix 5x5 find 3 circles in left bottom diagonal',
    input: [[0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0]],
    expectedOutput: [[1, 5], [2, 4], [3, 3]]
}
let testCase7 = {
    name: '7) Matrix 5x5 find 3 crosses in first left top diagonal',
    input: [[0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 2, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[2, 2], [3, 3], [4, 4]]
};
let testCase8 = {
    name: '8) Matrix 5x5 find 3 circles in first column',
    input: [[1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
    expectedOutput: [[1, 1], [1, 2], [1, 3]]
};
let testCase9 = {
    name: '9) Matrix 5x5 find 3 circles in left top diagonal: polute with crosses',
    input: [[2, 2, 0, 2, 2],
            [2, 1, 2, 2, 0],
            [2, 2, 1, 2, 2],
            [0, 2, 2, 1, 2],
            [2, 0, 2, 0, 2]],
    expectedOutput: [[2, 2], [3, 3], [4, 4]]
};
let testCase10 = {
    name: '10) Matrix 5x5 find 3 circles in left bottom diagonal: polute with crosses and circles',
    input: [[1, 1, 0, 2, 2],
            [1, 2, 2, 1, 1],
            [2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1],
            [2, 2, 1, 1, 2]],
    expectedOutput: [[2, 4], [3, 3], [4, 2]]
};
let testCase11 = {
    name: '11) Matrix 5x5 find 3 circles in last column: polute with crosses and circles',
    input: [[1, 1, 0, 2, 2],
            [1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1],
            [1, 1, 2, 2, 1],
            [2, 2, 0, 1, 1]],
    expectedOutput: [[5, 4], [5, 3], [5, 5]]
};
let testCase12 = {
    name: '12) Matrix 5x5 find 3 circles in first column: polute with crosses and circles',
    input: [[1, 1, 0, 2, 2],
            [1, 2, 2, 1, 2],
            [1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1],
            [2, 2, 0, 1, 2]],
    expectedOutput: [[1, 1], [1, 3], [1, 2]]
};
let testCase13 = {
    name: '13) Matrix 5x5 find 3 crosses in left bottom diagonal: polute with crosses and circles',
    input: [[1, 1, 0, 2, 2],
            [1, 2, 2, 1, 2],
            [1, 1, 2, 2, 1],
            [2, 2, 0, 1, 1],
            [2, 2, 0, 1, 2]],
    expectedOutput: [[2, 4], [1, 5], [3, 3]]
};
let testCase14 = {
    name: '14) Matrix 5x5 find 3 crosses in first row: polute with crosses and circles',
    input: [[1, 1, 2, 2, 2],
            [1, 2, 2, 1, 2],
            [1, 1, 0, 2, 1],
            [2, 2, 0, 1, 1],
            [2, 2, 0, 1, 2]],
    expectedOutput: [[5, 1], [4, 1], [3, 1]]
};
let testCase15 = {
    name: '15) Matrix 5x5 find 3 crosses in last row: polute with crosses and circles',
    input: [[2, 2, 1, 1, 2],
            [1, 2, 2, 1, 2],
            [1, 1, 0, 2, 1],
            [2, 2, 0, 1, 1],
            [2, 2, 2, 1, 2]],
    expectedOutput: [[2, 5], [1, 5], [3, 5]]
};

export let  testSuiteCircle = [testCase1, testCase4, testCase5, testCase8, testCase9, testCase10, testCase11, testCase12];
export let  testSuiteCross = [testCase2, testCase3, testCase7, testCase13, testCase14, testCase15];

