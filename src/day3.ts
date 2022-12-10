import { readFileSync } from 'fs'

const ruckSacks = readFileSync('inputs/day3.txt', 'utf-8').split('\n');

const findDuplicates = (...args: string[][]): string[] => {

    if (args.length === 1) return args[0] as string[];

    const pool = new Set(args[0]);
    const duplicates = new Set<string>();

    for (let i = 0; i < args[1].length; i++) {
        const item = args[1][i]
        if (pool.has(item)) {
            duplicates.add(item)
        }
    }

    return findDuplicates(...[Array.from(duplicates), ...args.slice(2, args.length)])
}

const splitInComponents = (sack: string) => {
    const comp1 = sack.split('').slice(0, sack.length / 2)
    const comp2 = sack.split('').slice(comp1.length, sack.length)
    return [comp1, comp2]
}

const splitInGroups = (sack: string[]) => {
    let d: string[][] = [];
    for (let i = 0; i < ruckSacks.length;) {
        const f = findDuplicates(ruckSacks[i].split(''), ruckSacks[i + 1].split(''), ruckSacks[i + 2].split(''))
        d.push(f)
        i += 3
    }
    return d;
}


const calculatePoints = (sacks: string[]) => {
    return sacks.map(a => {
        const ascii = a.charCodeAt(0)
        if (ascii >= 97 && ascii <= 122) return ascii - 96
        if (ascii >= 65 && ascii <= 90) return ascii - 65 + 27
        else return 0;
    }).reduce((acc, v) => acc + v, 0)
}


const part1 = calculatePoints(ruckSacks.map(splitInComponents).map((groups) => findDuplicates(...groups)).flat())
const part2 = calculatePoints(splitInGroups(ruckSacks).flat())


console.log(part1) // 7980
console.log(part2) // 2881


