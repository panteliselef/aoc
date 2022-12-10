import { readFileSync } from 'fs'

const elves = readFileSync('inputs/i.txt', 'utf-8').split('\n\n');

const sums = (elves.map(elf => elf.split('\n').map(s => +s).reduce((acc, value) => acc += value)))

const sortedSums = sums.sort((a,b)=> a-b).reverse()

console.log(sortedSums.splice(0,3).reduce((acc, value) => acc += value))