const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n')

let out = 0;
input.forEach(line => {
    let [range, letter, password] = line.split(' ');
    range = range.split('-');
    letter = letter.replace(':', '');

    let c = 0;
    [...password].forEach(p => {
        if (letter === p) c++;
    })

    if (c >= range[0] && c <= range[1]) {
        out++;
    }
});

console.log(out);