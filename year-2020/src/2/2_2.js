const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n');

let out = 0;
input.forEach(line => {
    let [range, letter, password] = line.split(' ');
    range = range.split('-');
    range[0]--; // Normalize index
    range[1]--;
    letter = letter.replace(':', '');

    if (password[range[0]] === letter ^ password[range[1]] === letter) {
        out++;
    }
});

console.log(out);