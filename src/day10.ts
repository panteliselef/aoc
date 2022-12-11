import { readFileSync } from 'fs'

/**
 * Read file
 */
const program = readFileSync('inputs/day10.txt', 'utf-8').split('\n').map(row => row.split(' '))

/**
 * util funtions
 */
const to2DIndex = (n: number) => {
    const row = Math.floor((n / 40) % 6)
    const col = n % 40
    return [row, col]
}

/**
 * Match signalStrengths with init values
 */
const significatSignalStrengths: { [key: number]: number } = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0,
}

let registerX = 1, cycles = 0;

const shouldPaintPixel = () => registerX === to2DIndex(cycles)[1] || registerX - 1 === to2DIndex(cycles)[1] || registerX + 1 === to2DIndex(cycles)[1]

const checkSignificantSignalStrength = (cycles: number) => {
    if (significatSignalStrengths[cycles] === 0) {
        significatSignalStrengths[cycles] = registerX * cycles
    }
}

const crtMonitor = Array(6).fill('.').map(() => Array(40).fill('.'))

const runCycle = () => {
    if (shouldPaintPixel()) {
        // update monitor line
        const [row, col] = to2DIndex(cycles)
        crtMonitor[row][col] = '#'
    }
    cycles++;
    checkSignificantSignalStrength(cycles);
}


for (let i = 0; i < program.length; i++) {
    const [instruction, value] = program[i];
    if (instruction === 'noop') {
        runCycle()
        continue
    }

    if (instruction === 'addx') {
        const addV = Number(value);
        for (let j = 0; j < 2; j++) {
            runCycle()
            if (j === 1) {
                registerX += addV;
            }
        }
        continue;
    }
}


console.log(Object.values(significatSignalStrengths).reduce((acc, curr) => acc + curr, 0)) // 15360
console.log(crtMonitor.forEach(row => {
    console.log(row.join(''))
}))
// ###..#..#.#....#..#...##..##..####..##..
// #..#.#..#.#....#..#....#.#..#....#.#..#.
// #..#.####.#....####....#.#......#..#..#.
// ###..#..#.#....#..#....#.#.##..#...####.
// #....#..#.#....#..#.#..#.#..#.#....#..#.
// #....#..#.####.#..#..##...###.####.#..#.