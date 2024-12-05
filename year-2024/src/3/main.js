export async function main(input, part) {
    input = input.text;

    const part1 = () => [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
        .map(match => Number(match[1]) * Number(match[2])).reduce((p, c) => p + c)

    const part2 = () => [...input.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)]
        .map(match => Number(match[1]) * Number(match[2]) || (match[0] === 'do()'))
        .filter((v) => (v === false || v === true) ? (globalThis.off = !v) : !globalThis.off)
        .reduce((p, c) => p + c)

    console.log(eval(`part${part}`).call())
}