export async function main(input, part) {
    input = input.matrixRows;

    const isSafePair = (a, b) => (b > a && b - a <= 3)
    const notSafeCount = (arr) => arr.toSpliced(-1).filter((v, i) => !isSafePair(v, arr[i + 1])).length
    const isSafe = (arr) => notSafeCount(arr) === 0 || notSafeCount(arr.toReversed()) === 0

    const part1 = () => input.map(isSafe)
        .filter(Boolean).length;

    const part2 = () => input.map(arr => arr.reduce((p, c, i) => p || isSafe(arr.toSpliced(i, 1)), false))
        .filter(Boolean).length

    console.log(eval(`part${part}`).call())
}