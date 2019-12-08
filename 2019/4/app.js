const start = 124075;
const end = 580769;

let c = 0;
for (let i = start; i <= end; i++) {
    const numStr = `${i}`;
    
    let wrong = false;
    for (let j = 1; j < numStr.length; j++) {
        if (+numStr[j] < +numStr[j - 1]) {
            wrong = true;
        }
    }
    if (wrong) continue;
    
    const matches = numStr.match(/(\d)\1+/g);
    if (!matches || !matches.some(item => (item.length === 2))) {
        continue;
    }
        
    c++;
}

console.log(c)
