const input = `30373
25512
65332
33549
35390`
    .split('\n').map(x => x.split('').map(x => ({
        h: Number(x),
        tScore: 0,
        rScore: 0,
        bScore: 0,
        lScore: 0,
    })));

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        searchVisibility(i, j);
    }
}

function searchVisibility(i, j) {
    if (i === 0 || i === input.length - 1 || j === 0 || j === input.length - 1) {
        return input[i][j].isVisible = true;
    }

    let tVisible = true;
    for (let ii = i - 1; tVisible && ii >= 0; ii--) {
        tVisible = tVisible && input[i][j].h > input[ii][j].h;
        input[i][j].tScore++;
    }

    let rVisible = true;
    for (let jj = j + 1; rVisible && jj < input.length; jj++) {
        rVisible = rVisible && input[i][j].h > input[i][jj].h;
        input[i][j].rScore++;
    }

    let bVisible = true;
    for (let ii = i + 1; bVisible && ii < input.length; ii++) {
        bVisible = bVisible && input[i][j].h > input[ii][j].h;
        input[i][j].bScore++;
    }

    let lVisible = true;
    for (let jj = j - 1; lVisible && jj >= 0; jj--) {
        lVisible = lVisible && input[i][j].h > input[i][jj].h;
        input[i][j].lScore++;
    }

    input[i][j].isVisible = tVisible || rVisible || bVisible || lVisible;
}

// Part 1
console.log(input.flat().reduce((p, c) => p + +c.isVisible, 0));

// Part 2
console.log(Math.max(...input.flat().map(x => x.tScore * x.rScore * x.bScore * x.lScore)));
