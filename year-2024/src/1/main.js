export async function main(input, part) {
    input = input.matrixCols.map(i => i.sort())

    const part1 = () => input[0]
        .reduce((p, _, i) => p + Math.abs(input[0][i] - input[1][i]), 0)

    const part2 = () => input[0]
        .reduce((p, _, i) => p + input[0][i] * input[1].filter(val => val === input[0][i]).length, 0)

    console.log(eval(`part${part}`).call())
}