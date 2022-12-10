import { readFileSync } from 'fs'

const directions = readFileSync('inputs/day9.txt', 'utf-8').split('\n').map(row => row.split(' '))


const l = 1000

const grid = new Array(l).fill('.').map(() => new Array(l).fill('.'))
const movementGrid = new Array(l).fill('.').map(() => new Array(l).fill('.'))

const printGrid = (grid: string[][]) => {
    console.log('----------------')
    grid.forEach(row => {
        console.log(row.join(''))
        console.log('\n')
    })
}


let tPos = [Math.floor(movementGrid.length / 2), Math.floor(movementGrid[0].length / 2)]
let hPos = [Math.floor(movementGrid.length / 2), Math.floor(movementGrid[0].length / 2)]
grid[tPos[0]][tPos[1]] = '#'
movementGrid[hPos[0]][hPos[1]] = 'H'


let movement: { [key: string]: { x: number, y: number } } = {
    'U': { x: 0, y: -1 },
    'D': { x: 0, y: 1 },
    'L': { x: -1, y: 0 },
    'R': { x: 1, y: 0 },
};


const moveT = () => {

    const [hRow, hCol] = hPos;
    const [tRow, tCol] = tPos;

    const rowDiff = (hRow - tRow);
    const colDiff = (hCol - tCol);

    let newTPost = [tRow, tCol];

    if (rowDiff > 1 && colDiff === 0) {
        newTPost = [hRow - 1, newTPost[1]];
    }

    if (colDiff > 1 && rowDiff === 0) {
        newTPost = [newTPost[0], hCol - 1];
    }

    if (rowDiff > 1 && colDiff !== 0) {
        newTPost = [hRow - 1, hCol];
    }

    if (colDiff > 1 && rowDiff !== 0) {
        newTPost = [hRow, hCol - 1];
    }


    if (rowDiff < -1 && colDiff !== 0) {
        newTPost = [hRow + 1, hCol];
    }

    if (colDiff < -1 && rowDiff !== 0) {
        newTPost = [hRow, hCol + 1];
    }

    if (rowDiff < -1 && colDiff === 0) {
        newTPost = [hRow + 1, newTPost[1]];
    }

    if (colDiff < -1 && rowDiff === 0) {
        newTPost = [newTPost[0], hCol + 1];
    }

    return newTPost
}


directions.forEach(([dir, steps]) => {
    const { x, y } = movement[dir]
    for (let i = 0; i < +steps; i++) {
        hPos = [hPos[0] + y, hPos[1] + x]
        movementGrid[hPos[0]][hPos[1]] = 'H'
        tPos = moveT();
        grid[tPos[0]][tPos[1]] = '#'
        movementGrid[tPos[0]][tPos[1]] = 'T'
    }
})

console.log(grid.flat().filter((x) => x.includes("#")).length) // answer 6190



