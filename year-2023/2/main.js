input = require('fs').readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const all = { red: 12, green: 13, blue: 14 }

const n = (x => x || 0)

const parseSets = (str) => str.match(/^Game \d+: (.+)$/).at(1).split(';')
    .map(str => [...str.matchAll(/((\d+) (red|green|blue))/g)]
        .reduce((p, c) => ({ [c[3]]: +c[2], ...p }), {}))

const gamePossible = (sets) => sets.reduce((p, c) => p && n(c.red) <= all.red && n(c.green) <= all.green && n(c.blue) <= all.blue, true)
const fewestPossible = (sets) => sets
    .reduce((p, c) => ({
        red: p.red > n(c.red) ? p.red : n(c.red),
        green: p.green > n(c.green) ? p.green : n(c.green),
        blue: p.blue > n(c.blue) ? p.blue : n(c.blue)
    }), { red: 0, green: 0, blue: 0 })

const part1 = input.map(parseSets).map(gamePossible).reduce((p, c, i) => p + (c && (i + 1)), 0)
const part2 = input.map(parseSets).map(fewestPossible).reduce((p, c) => p + c.red * c.green * c.blue, 0)


console.log(part1)
console.log(part2)