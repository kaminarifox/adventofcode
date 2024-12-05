import { readFile } from 'node:fs/promises';
import { AOCInput } from "./helpers/aoc-input.js";

const [year, day, part] = process.argv[2].split('.')
const puzzle = await import(`./${day}/main.js`)

const input = await AOCInput.fetch({
    year,
    day,
    session: process.env.AOC_TOKEN,
    raw: process.env.AOC_TEST && await readFile(`src/${day}/test.txt`, { encoding: 'utf-8' }),
    parser: parseInt,
})

puzzle.main(input, part);

