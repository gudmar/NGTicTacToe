import { ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';

// let testCase0 = {
//     name: '0) Exploaratory: O_OOO_O',
//     input: [[2, 2, 1, 2, 2, 0, 1],
//             [0, 2, 2, 2, 1, 2, 2],
//             [0, 0, 0, 1, 0, 0, 1],
//             [0, 2, 2, 0, 0, 2, 1],
//             [1, 1, 1, 2, 1, 1, 1],
//             [0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0]],
//     expectedOutput: {
//         foundElements: [[3, 5], [5, 5],[6, 5], [7, 5]],
//         nextMoveProposals: [[4, 5]]
//     }
// };

let testCase0 = {
    name: '0) Exploaratory: O_O_O_O',
    input: [[1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
    expectedOutput: {
        foundElements: [[1, 1], [3, 1],[5, 1], [7, 1]],
        nextMoveProposals: [[4, 1]]
    }
};

// !!! Important. Very dangerous pattern, as many subpatterns can be created separatly, and then combined with one move. That is why
// for bigger boards X_X_X search pattern should be concidered


export let testCases = [testCase0]