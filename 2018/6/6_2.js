const fs = require ('fs');

const input = fs.readFileSync('in.txt', 'utf8').trim().split('\n');
const s = 400;
const field = new Array(s * s).fill(0);

function distance(p1, p2, q1, q2) {
    return Math.abs(p1 - q1) + Math.abs(p2 - q2)
}

let counter = 0;

for (let i = 0; i < s; i++) {
    for(let j = 0; j < s; j++) {

        let distSum = 0;

        input.forEach(point => {
            point = point.split(',');
            distSum += distance(point[0], point[1], i, j);
        });

        if (distSum < 10000) {
            counter++;
        }
    }
}

console.log(counter);

