const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');

const toDig = {
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9',
    eno: '1', owt: '2', eerht: '3', ruof: '4', evif: '5', xis: '6', neves: '7', thgie: '8', enin: '9'
}

const part1 = () => {
    const r = input
        .map(str => Number(str.match(/^[^\d]{0,}(\d)/).at(1) + str.match(/(\d)[^\d]{0,}$/).at(1)))
        .reduce((a, b) => a + b, 0);
    console.log(r);
}

const part2 = () => {
    const fdig = (str) => toDig[[...str.matchAll(/\d|one|two|three|four|five|six|seven|eight|nine/g)].at(0).at(0)]
    const ldig = (str) => toDig[[...[...str].reverse().join('').matchAll(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g)].at(0).at(0)]

    const r = input
        .map(str => fdig(str) + ldig(str))
        .reduce((a, b) => Number(a) + Number(b), 0)

    console.log(r);
}

part1();
part2();

