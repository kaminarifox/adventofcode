const fs = require('fs');

const w = 25, h = 6;
const input = fs.readFileSync('/home/neroshigure/Projects/adventofcode/2019/8/input', {encoding: 'utf-8'});
const totalLayers = input.length / (w * h);

let layers = [];
for (let i = 0; i < totalLayers; i++) {
    let layer = [];
    let zeros = 0;
    for (let j = 0; j < w * h; j++) {
        const pixel = parseInt(input[i * w + j]);
        if (pixel === 0) {
            zeros++;
        }
        layer.push(pixel);
    }

    layers.push({zeros: zeros, layer: layer});
}

layers = layers.sort((a, b) => {
    return a.zeros - b.zeros;
});

const out = layers[1].layer.filter(item => item === 1).length 
    * layers[1].layer.filter(item => item === 2).length;

console.log(out);


