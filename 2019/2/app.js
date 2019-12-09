// https://adventofcode.com/2019/day/2

function program(noun = 12, verb = 02) {
    const input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,6,19,23,2,23,6,27,1,5,27,31,1,10,31,35,2,6,35,39,1,39,13,43,1,43,9,47,2,47,10,51,1,5,51,55,1,55,10,59,2,59,6,63,2,6,63,67,1,5,67,71,2,9,71,75,1,75,6,79,1,6,79,83,2,83,9,87,2,87,13,91,1,10,91,95,1,95,13,99,2,13,99,103,1,103,10,107,2,107,10,111,1,111,9,115,1,115,2,119,1,9,119,0,99,2,0,14,0";
    const inputArr = input.split(',').map(n => parseInt(n, 10));

    inputArr[1] = noun;
    inputArr[2] = verb;

    let pointer = 0;

    function getAddr(ptr) {
        return inputArr[ptr];
    }

    while(inputArr[pointer] != 99) {
        switch(inputArr[pointer]) {
            case 1:
                inputArr[getAddr(pointer + 3)] = inputArr[getAddr(pointer + 1)] + inputArr[getAddr(pointer + 2)];
                break;
            case 2:
                inputArr[getAddr(pointer + 3)] = inputArr[getAddr(pointer + 1)] * inputArr[getAddr(pointer + 2)];
                break;
            default:
                throw Error(`Undefined opcode: ${inputArr[pointer]}`);
        }

        pointer += 4;
    }

    if (inputArr[0] === 19690720) {
        console.log(noun, verb);
    }
}

for (let i = 1; i < 100; i++) {
    for (let j = 1; j < 100; j++) {
        program(i, j);
    }
}