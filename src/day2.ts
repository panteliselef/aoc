import { readFileSync } from 'fs'

const rounds = readFileSync('inputs/day2.txt', 'utf-8').split('\n');


const moves = rounds.map(r => {
    const [oponent, me] = r.split(' ');

    return ({
        oponent,
        me,
    })
})

let score = 0;

const l: { [key: string]: string } = {
    'r': 's',
    'p': 'r',
    's': 'p'
}

const o: { [key: string]: string } = {
    's': 'r',
    'r': 'p',
    'p': 's'
}

const points: { [key: string]: number } = {
    'r': 1,
    'p': 2,
    's': 3
}

const m: { [key: string]: string } = {
    'A': 'r',
    'X': 'r',
    'B': 'p',
    'Y': 'p',
    'C': 's',
    'Z': 's',
}

moves.forEach(({ oponent, me }) => {
    const mine = me=== 'X' ? l[m[oponent]] : me === 'Y' ? m[oponent] : o[m[oponent]];

    if (m[oponent] === mine) {
        score += 3
    } else if (l[m[oponent]] === mine) {
        score += 0
    } else {
        score += 6
    }

    score += points[mine]



})

console.log('Points', score)
