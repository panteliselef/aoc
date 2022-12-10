import { readFileSync } from 'fs'

const grid = readFileSync('inputs/day8.txt', 'utf-8').split('\n').map(row => row.split('').map(a => +a))


const isVisible = (row: number, col: number) => {
    const cell = grid[row][col];

    let topHidden = false;
    let bottomHidden = false;
    let leftHidden = false;
    let rightHidden = false;

    for (let i = row - 1; i >= 0; i--) {
        const _row = grid[i][col];
        if (_row >= cell) {
            topHidden = true;
        }

    }

    for (let i = row + 1; i < grid.length; i++) {
        const _row = grid[i][col];

        if (_row >= cell) {
            bottomHidden = true
        }
    }

    for (let j = col - 1; j >= 0; j--) {
        const _row = grid[row][j];

        if (_row >= cell) {
            leftHidden = true
        }
    }


    for (let j = col + 1; j < grid[0].length; j++) {
        const _row = grid[row][j];
        if (_row >= cell) {
            rightHidden = true
        }

    }

    const a = [topHidden, bottomHidden, leftHidden, rightHidden].filter(a => a).length

    return a !== 4
}



const score = (row: number, col: number) => {
    const cell = grid[row][col];

    let topHidden = 0;
    let bottomHidden = 0;
    let leftHidden = 0;
    let rightHidden = 0;

    for (let i = row - 1; i >= 0; i--) {
        const _row = grid[i][col];
        console.log('row', cell, _row);
        topHidden++;
        if (_row >= cell) {
            break;
        }

    }

    for (let i = row + 1; i < grid.length; i++) {
        const _row = grid[i][col];
        bottomHidden++;
        if (_row >= cell) {
            break;
        }
    }

    for (let j = col - 1; j >= 0; j--) {
        const _row = grid[row][j];

        leftHidden++;
        if (_row >= cell) {
            break;
        }
    }


    for (let j = col + 1; j < grid[0].length; j++) {
        const _row = grid[row][j];

        rightHidden++;
        if (_row >= cell) {
            break;
        }

    }

    return topHidden * bottomHidden * leftHidden * rightHidden
}

let visibleTrees = 0;
let maxScore = 0;
let maxScorePos = [-1, -1]

for (let i = 1; i < grid.length - 1; i++) {
    const row = grid[i];
    for (let j = 1; j < row.length - 1; j++) {

        if (isVisible(i, j)) {
            visibleTrees++;
        }

        const s = score(i, j);
        if (s >= maxScore) {
            maxScore = s;
            maxScorePos = [i, j]
        }
    }
}

visibleTrees += (grid.length * 2)
visibleTrees += (grid[0].length - 2) * 2

console.log('Visible trees: ', visibleTrees)
console.log('Max score: ', maxScore, 'at', maxScorePos)



