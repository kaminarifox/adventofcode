const fs = require('fs');

const w = 25, h = 6;
const input = fs.readFileSync(__dirname + '/input', {encoding: 'utf-8'}).replace(/0/g, '█').replace(/1/g, '░');
const totalLayers = Math.floor(input.length / (w * h));

let image = [];
for (let i = 0; i < totalLayers; i++) {
    for (let j = 0; j < w * h; j++) {
        if (i === 0) {
            image.push(input[j]);
        } else {
            if (image[j] == 2) {
                image[j] = input[i * w * h + j];
            }
        }
    }
}

for (let i = 0; i < h; i++) {
    console.log(image.slice(i * w, i * w + w).join(''))
}
