const fs = require ('fs');

const input = fs.readFileSync('in.txt', 'utf8').trim().split('\n');
const s = 400;
const field = new Array(s * s).fill(0);

function distance(p1, p2, q1, q2) {
    return Math.abs(p1 - q1) + Math.abs(p2 - q2)
}

for (let i = 0; i < s; i++) {
    for(let j = 0; j < s; j++) {

        const distances = [];

        input.forEach(point => {
            point = point.split(',');

            const d = distance(point[0], point[1], i, j);
            distances.push(d);
        });

        const max = Math.min(...distances)
        maxIndex = distances.indexOf(max);
        distances[maxIndex] = -1;

        if (Math.max(distances) === max) {
            field[i * s + j] = '.'
        } else {
            field[i * s + j] = maxIndex;
        }
    }
}

let infinity = new Set();
for(let i = 0; i < s; i++) {
    infinity.add(field[i]); // top
    infinity.add(field[s * (s - 1) + i]); // bottom 
    infinity.add(field[s * i]); // left
    infinity.add(field[s * i + s - 1]); // right
}
infinity = [...infinity];

const counter = {};
for (let i = 0; i < field.length; i++) {
    
    if (infinity.indexOf(field[i]) !== -1) {
        continue;
    }

    if(counter[field[i]]) {
        counter[field[i]]++;
    } else {
        counter[field[i]] = 1;
    }
} 

console.log(counter);
