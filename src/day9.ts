import { readFileSync } from 'fs'


type Point = { x: number, y: number }
type PointArray = [number, number]


let movement: { [key: string]: Point } = {
    'U': { x: 0, y: -1 },
    'D': { x: 0, y: 1 },
    'L': { x: -1, y: 0 },
    'R': { x: 1, y: 0 },
};
const l = 1000

const grid = new Array(l).fill('.').map(() => new Array(l).fill('.'))
const movementGrid = new Array(l).fill('.').map(() => new Array(l).fill('.'))

const printGrid = (grid: string[][]) => {
    console.log('----------------')
    grid.forEach(row => {
        console.log(row.join(''))
    })
}


const directions = readFileSync('inputs/day9part2.txt', 'utf-8').split('\n').map(row => row.split(' '))


const middleRow = Math.floor(grid.length / 2);
const middleCol = Math.floor(grid[0].length / 2);

const positions: PointArray[] = [];

const length = 10

for (let i = 0; i < length; i++) {
    positions.push([middleRow, middleCol])
}

positions.forEach(([row, col]) => {
    grid[row][col] = '#'
})



const calcTailPositionFromHead = (head: PointArray, tail: PointArray) => {

    const [hRow, hCol] = head;
    const [tRow, tCol] = tail;

    let newTPost = [tRow, tCol]satisfies PointArray;


    const dx = Math.abs((hCol - tCol))
    const dy = Math.abs((hRow - tRow))

    if ((dx === 0 && dy === 0) || dx + dy === 1 || (dx === 1 && dy === 1)) {
        return newTPost
    }

    /*T.H.. -> .TH..*/
    if (dx === 0) {
        newTPost = [(hRow + tRow) / 2, newTPost[1]];
    }
    /*..H..    ..H..
      ..... -> ..T..
      ..T..    ..... */
    if (dy === 0) {
        newTPost = [newTPost[0], (hCol + tCol) / 2];
    }
    /*..H..    ..H..
      ..... -> .T...
      T....    .....*/
    if (dx > 1 && dy > 1) {
        newTPost = [(hRow + tRow) / 2, (hCol + tCol) / 2];
    }
    /*..H..    .TH..
      T.... -> .....
      .....    .....*/
    if (dx > dy) {
        newTPost = [hRow, (hCol + tCol) / 2];
    }
    /*..H..    ..H..
      ..... -> ..T..
      .T...    .....*/
    if (dy > dx) {
        newTPost = [(hRow + tRow) / 2, hCol];
    }

    return newTPost
}


movementGrid[positions[0][0]][positions[0][1]] = `${0}`

directions.forEach(([dir, steps]) => {
    const { x, y } = movement[dir]
    for (let i = 0; i < +steps; i++) {

        positions[0] = [positions[0][0] + y, positions[0][1] + x]

        for (let j = 0; j < length - 1; j++) {

            positions[j + 1] = calcTailPositionFromHead(positions[j], positions[j + 1])

            movementGrid[positions[j][0]][positions[j][1]] = `${j}`
            movementGrid[positions[j + 1][0]][positions[j + 1][1]] = `${j + 1}`

            if (j + 1 === length - 1) {
                grid[positions[j + 1][0]][positions[j + 1][1]] = '#'
            }


        }
    }
})

console.log(grid.flat().filter((x) => x.includes("#")).length) // answer 6190



