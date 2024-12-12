export async function main(input, part) {
    const rules = Array(100).fill(0).map(i => Array(100).fill(false));
    [...input.text.matchAll(/(?<l>\d\d)\|(?<r>\d\d)/g)]
        .map((m) => [+m.groups.l, +m.groups.r])
        .forEach(([l, r]) => rules[l][r] = true)

    const pageLines = input.text.split('\n\n')[1].split('\n')
        .map(line => line.split(',').map(Number))

    const isCorrect = (pages, state = true) => {
        for (let i = 0; i < pages.length - 1; i++)
            for (let j = i + 1; j < pages.length; j++)
                state &&= rules[pages[i]][pages[j]]
        return state;
    }

    const fix = (pages) => {
        for (let i = 0; i < pages.length - 1; i++)
            for (let j = i + 1; j < pages.length; j++)
                if (!rules[pages[i]][pages[j]])
                    [pages[i], pages[j]] = [pages[j], pages[i]];

        return pages;
    }

    const part1 = () => pageLines
        .map(pages => isCorrect(pages) ? pages[Math.floor(pages.length / 2)] : 0)
        .reduce((p, c) => p + c)

    const part2 = () => pageLines
        .map(pages => !isCorrect(pages) ? fix(pages)[Math.floor(pages.length / 2)] : 0)
        .reduce((p, c) => p + c)

    console.log(eval(`part${part}`).call())
}