const fs = require('fs');

let str = fs.readFileSync('in.txt', 'utf8').trim()

while(true) {

    str = str.split('');
    let c = str.length - 1
    let reacts = 0;

    while(c >= 1) {
        if ((str[c].toLowerCase() === str[c - 1].toLowerCase()) && (str[c] !== str[c - 1])) {
            str[c] = str[c - 1] = " ";
            reacts += 2;
            c -= 2;
        } else {
            c--;
        }
    }

    str = str.join('').split(' ').join('');

    if (reacts == 0) {
        break;
    }
}

console.log(str.length);
