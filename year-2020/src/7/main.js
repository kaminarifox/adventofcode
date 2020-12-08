const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n');

const myColor = 'shiny gold';
const colorMap = {};
input.forEach((rule, index) => {
    colorMap[rule.match(/^[a-z]+ [a-z]+/).pop()] = index
});

const rulesTable = Array(input.length).fill(null).map(() => Array(input.length).fill(0));
input.forEach((rule, index) => {
    const matches = rule.matchAll(/(?: (\d) ([a-z]+ [a-z]+)(?: bags?[.,]))/g);
    for (let m of matches) {
        const [_, parentVolume, color] = m;
        rulesTable[index][colorMap[color]] = Number(parentVolume);
    }
});

function depth(colorIndex) {
    let bags = [];
    for (let i = 0; i < input.length; i++) {
        if (rulesTable[i][colorIndex] > 0) {
            bags = [i, ...bags, ...depth(i)];
        }
    }

    return bags;
}

function capacity(colorIndex, parentCapacity = 1) {
    let out = 0;
    for (let i = 0; i < input.length; i++) {
        if (rulesTable[colorIndex][i] > 0) {
            out += rulesTable[colorIndex][i] * parentCapacity;
            out += capacity(i, parentCapacity * rulesTable[colorIndex][i])
        }
    }

    return out;
}

// First puzzle
console.log(new Set(depth(colorMap[myColor])).size);

// Second puzzle
console.log(capacity(colorMap[myColor]));
