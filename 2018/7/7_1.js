const fs = require('fs');

let arr = fs.readFileSync('in.txt', 'utf8').trim().split('\n');

let out = "";


arr.forEach(step => {

    const steps = step.match(/[A-Z]/g);
    
    s2 = steps.pop();
    s1 = steps.pop();
    
    let i = out.indexOf(s1);
    if (i === -1) {    
        out += s1;
    } else {
        
    }
});

