const fs = require('fs');

let str = fs.readFileSync('in.txt', 'utf8')

function reducer(str) {
    
    str = str.trim().split('');
    
    while(true) {

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
        
        str = str.join('').split(' ').join('').split('');
        
        if (reacts == 0) {
            break;
        }
    }
    
    return str;
}

let minLength = 1000000000;
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
   
    const re = new RegExp(letter, 'ig');
    const tmpStr = str.replace(re, '');

    const reduced = reducer(tmpStr);
    
    if (reduced.length < minLength) {
        minLength = reduced.length
    }
});

console.log(minLength);

