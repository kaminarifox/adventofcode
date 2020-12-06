const fs = require('fs');

const input = fs.readFileSync('./in', {encoding: 'utf-8'});
const n = 1000;
const field = Array(n * n);
let out = 1;

const locations = [
    {x: 500, y: 500},
    {x: 500, y: 500},
];

field[n * locations[0].y + locations[0].x] = 1;
[...input].forEach((direction, index) => {
    const santa = +(index % 2 !== 0);

    if (direction === '^') {
        locations[santa].y++;
    } else if (direction === 'v') {
        locations[santa].y--;
    } else if (direction === '>') {
        locations[santa].x++;
    } else if (direction === '<') {
        locations[santa].x--;
    }

    const i = n * locations[santa].y + locations[santa].x;
    if (field[i] === undefined) { out++; } 
    field[i] = (field[i] || 0) + 1;
});

console.log(out);
