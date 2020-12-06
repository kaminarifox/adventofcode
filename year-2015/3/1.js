const fs = require('fs');

const input = fs.readFileSync('./in', {encoding: 'utf-8'});
const n = 10000;
const field = Array(n * n);
let x = 5000, y = 5000, out = 0;

[...input].forEach(direction => {
    if (direction === '^') {
        y++;
    } else if (direction === 'v') {
        y--;
    } else if (direction === '>') {
        x++;
    } else if (direction === '<') {
        x--;
    }

    field[n * y + x] = (field[n * y + x] || 0) + 1;
    if (field[n * y + x] === 1) {
        out++;
    }
});

console.log(out);

