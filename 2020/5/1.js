const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n');

function seatToId(seat) {
    let seatCode = 0b1111111111;
    [512, 256, 128, 64, 32, 16, 8, 4, 2, 1].forEach((base, index) => {
        seatCode = ['F', 'L'].includes(seat[index]) ? seatCode ^ base : seatCode | base;
    });
    return (seatCode >> 3) * 8 + (seatCode & 0b111);
}
const seatsIds = input.map(seatToId);

// First puzzle
console.log(Math.max(...seatsIds));

// Second puzzle
for (let i = 1; i < 126; i++) {
    for (let j = 0; j < 7; j++) {
        if (!seatsIds.includes(i * 7 + j)) {
            console.log(i * 7 + j);
        }
    }
}
