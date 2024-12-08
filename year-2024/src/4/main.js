import * as math from "../helpers/math.js";

export async function main(input, part) {
    input.settings = { colsDelimiter: '' };
    input = input.matrixRows.toReversed() // reversed to normalize coord system
    const degs = [0, 45, 90, 135, 180, 225, 270, 315];

    const rotateLine = (line, [cx, cy], deg) => line.map(([x, y]) => [
        cx + (x - cx) * math.cos(deg) - (y - cy) * math.sin(deg),
        cy + (x - cx) * math.sin(deg) + (y - cy) * math.cos(deg)
    ])

    const getLine = function* (size) {
        for (let i = 0; i < input.length; i++) for (let j = 0; j < input[0].length; j++)
            yield [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]].slice(0, size);
    }

    const isXmas = s => s == 'XMAS';
    const isMas = s => s == 'MAS' || s == 'SAM';

    const getSafe = (i, j) => { try { return input[i][j] } catch { } };

    const part1 = () =>
        [...getLine(4)].reduce((total, line) =>
            total + degs.reduce((xmasCnt, deg) =>
                xmasCnt + +isXmas(
                    rotateLine(line, line[0], deg).reduce((cnt, [i, j]) => cnt + (getSafe(i, j) ?? '_'), '')
                ), 0), 0);

    const part2 = () =>
        [...getLine(3)].reduce((total, line) =>
            total + +(isMas(rotateLine(line, line[1], 45).reduce((cnt, [i, j]) => cnt + (getSafe(i, j) ?? '_'), ''))
                && isMas(rotateLine(line, line[1], 135).reduce((cnt, [i, j]) => cnt + (getSafe(i, j) ?? '_'), ''))), 0)


    console.log(eval(`part${part}`).call())
}