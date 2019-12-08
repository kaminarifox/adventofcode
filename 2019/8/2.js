const fs = require('fs');

const w = 25, h = 6;
const input = fs.readFileSync('input', {encoding: 'utf-8'});
const totalLayers = input.length / (w * h);

let image = [];
for (let i = 0; i < totalLayers; i++) {
    for (let j = 0; j < w * h; j++) {
        if (image.length < w * h) {
            image.push(input[i * w + j]);
        } else {
            if (image[i * w + j] == 2) {
                image[i * w + j] = input[i * w + j];
            }
        }
    }
}

let out = ''
for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        switch(image[i * w + j]) {
            case '0':
                out += '⬛';
                break;
            case '1':
                out += '⬜';
            case '2':
                out += ' ';
        }
    }
    out += "\n";
}

console.log(out);
