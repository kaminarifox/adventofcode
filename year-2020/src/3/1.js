const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n')
const lines = input.length;
const lineLng = input[0].length;

let x = 3, y = 1, out = 0;

while(y < lines) {
    out +=  +(input[y][x % lineLng] === '#');
    x += 3;
    y += 1;
}

console.log(out);
