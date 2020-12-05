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
for (let i = 0; i < 127 * 7; i++) {
    if (!seatsIds.includes(i)) {
        console.log(i);
    }
}
