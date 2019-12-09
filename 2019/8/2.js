const fs = require('fs');

const w = 25, h = 6;
const input = fs.readFileSync(__dirname + '/input', {encoding: 'utf-8'});
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

let out = ''
for (let i = 0; i < w * h; i++) {
    if (i % w * h === 0) {
        out += '\n';
    }

    switch(image[i]) {
            case '0':
                out += '█';
                break;
            case '1':
                out += '░';
                break;
            case '2':
                out += '_';
                break;
            default:
                throw Error('Broken image :(')
    }
}
console.log(out);


