const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n')
const lines = input.length;
const lineLng = input[0].length;

let out = [];
const slopes = [
    [1, 1], [3, 1], [5, 1], [7, 1], [1, 2]
];

slopes.forEach(slope => {
    let slopeOut = 0;
    let x = slope[0], y = slope[1];

    while (y < lines) {
        slopeOut += +(input[y][x % lineLng] === '#');
        x += slope[0];
        y += slope[1];
    }

    out.push(slopeOut);
});

console.log(out.reduce((p, c) => p * c));
