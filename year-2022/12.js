let input = `abcccccaaaccccaacaaccaaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccaaaaaa
abcccccaaaacccaaaaaccaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccaaaa
abcccccaaaaccaaaaaccccaaaccaaaaaacccacaaaaccccccccccccccccaaaccccccccccccccccaaaa
abcccccaaacccaaaaaaccccccccaaaaaacccccaaccccccccccccccccccaaaccccccccccccccccaaaa
abcccccccccccccaaaacccccccaaaaaaaaccccccccccccccccccccccccaaacccccccccccccccaaaaa
abccccccaacccccaacccccccccaaaaaaaaccccccccccccccccccccccccaaaaccaaacccccccccccccc
abccccccaacccccccccccccccaaacccaaaacccaacaaccccccccccacaccaaacaajaacccccccccccccc
abcccaaaaaaaaccccacccccccaaaccccaaacccaaaaaccccccccccaaaaaaajjjjkkkccccccaacccccc
abcccaaaaaaaacaaaacccccccccccccccccccaaaaaccccccccciiiijjjjjjjjjkkkkcaaaaaacccccc
abcccccaaaacccaaaaaacccccccccccccccccaaaaaacccccciiiiiijjjjjjjrrrkkkkaaaaaaaacccc
abcccccaaaaacccaaaacccccccccaacccccccccaaaaccccciiiiiiiijjjjrrrrrsskkaaaaaaaacccc
abccccaaaaaaccaaaaacccccccccaaaacccccccaccccccciiiiqqqqrrrrrrrrrssskkkaaaaaaacccc
abaaccaaccaaccaacaacccccccaaaaaaccccccccccccccciiiqqqqqrrrrrrruussskkkaaaaacccccc
abaaaacccccccccccccccccccccaaaaccccccccaaaccccciiqqqqqttrrrruuuuussskkaaaaacccccc
abaaaacccccccccccccccccccccaaaaaccccccccaaaaccchiqqqtttttuuuuuuuussskkcccaacccccc
abaaacccccaaaccacccccccccccaacaaccccccaaaaaaccchhqqqtttttuuuuxxuussslllcccccccccc
abaaaaccccaaaaaacaaccccccaccccccccccccaaaaacccchhqqqttxxxxuuxxyyusssllllccccccccc
abacaaccccaaaaaacaaaaaaaaaaccccccccccccaaaaaccchhqqqttxxxxxxxxyuusssslllccccccccc
abcccccccaaaaaaacaaaaaaaaaccccaacccccccaaccaccchhhqqtttxxxxxxyyvvvsssslllcccccccc
abcccccccaaaaaaaaaaaaaaaaaccccaaaaccccccccccccchhhppqttxxxxxyyyvvvvsqqqlllccccccc
SbcccaaccaaaaaaaaaaaaaaaaaacaaaaaacccccccccccchhhhpptttxxxEzzyyyyvvvqqqqlllcccccc
abcccaaccccaaacaaaaaaaaaaaaacaaaaccccccccccccchhhppptttxxxyyyyyyyyvvvqqqlllcccccc
abaaaaaaaacaaacaaaaaaaaaaaaacaaaaacaaccccccccchhpppsssxxyyyyyyyyvvvvvqqqlllcccccc
abaaaaaaaaccccccccaaacaaaccccaacaaaaaccccccaagggpppsswwwwwwyyyvvvvvvqqqmmmmcccccc
abccaaaaccccaacaacaaacaaacccccccccaaacaaaccaagggppssswwwwwwyyywvvqqqqqqmmmccccccc
abcaaaaaccccaaaaacaaccaaccaaaccaaaaaaaaaaaaaagggppsssswwwswwyywvrqqqqmmmmcccccccc
abcaaaaaaccaaaaacccccccccaaaaccaaaaaaaaaacaaagggpppssssssswwwwwwrrqmmmmmccccccccc
abcaacaaaccaaaaaaccccccccaaaaccccaaaaaacccaaagggppppssssssrwwwwrrrmmmmmdccccccccc
abccccaaaccaaaaaaccccccccaaaaccccaaaaaacccaacggggpooooooosrrwwwrrnmmmddddcacccccc
abccccaaaaaaaacccccccccccccccccccaaaaaaaccccccggggoooooooorrrrrrrnnmdddddaaaacccc
abcccccaaaaaaccccccccccccccccccccaaacaaacccccccggggfffooooorrrrrrnnddddaaaaaacccc
abccaaaaaaaacccccccccccccccccccccaccccccccccccccggffffffooonrrrrnnndddaaaaaaacccc
abccaaaaaaaaaccccaacccccccccccccccccccccccccccccccfffffffoonnnnnnndddcaaaaacccccc
abccaaaaaaaaaacccaaccccccccccccccaccccccccccccccccccccffffnnnnnnnedddaaaaaacccccc
abcccccaaaaaaaaaaaacccccccaccccaaacccccccccccccccccccccfffeennnneeedcccccaacccccc
abcccccaaacccaaaaaaaaccccaaacccaaaccacccccccccccccccccccafeeeeeeeeecccccccccccccc
abcccccaaccccaaaaaaaaacccaaaaaaaaaaaaccccccaaaccccccccccaaeeeeeeeeeccccccccccccca
abaccccccccccaaaaaaaaacccaaaaaaaaaaacccccccaaaaacccccccaaaaceeeeecccccccccccaccca
abaccccccccccaaaaaaaaccaaaaaaaaaaaaaacccccaaaaaccccccccaaaccccaaacccccccccccaaaaa
abaccccccccccaaaaaaacccaaaaaaaaaaaaaacccccaaaaacccccccccccccccccccccccccccccaaaaa
abaccccccccccaccaaaacccaaaaaaaaaaaaaaccccccaaaaaccccccccccccccccccccccccccccaaaaa`.trim().split('\n').map(x => x.split('').map(x => x.charCodeAt(0)));

class Point {
    constructor(i, j, h) {
        this.i = i;
        this.j = j;
        this.h = h;
        this.links = new Set();
        this.isVisited = false;
        this.score = Number.MAX_SAFE_INTEGER;
    }

    addLink(point) {
        if (!this.links.has(point))
            this.links.add(point)
        if (!point.links.has(this)) {
            point.links.add(this);
        }
    }

    getLinkWeight(link) {
        if (link === endPoint) {
            return Math.abs(this.h - 'z'.charCodeAt(0));
        }
        if (this === startPoint) {
            return Math.abs('a'.charCodeAt(0) - link.h);
        }
        return Math.abs(this.h - link.h);
    }
}

// Make weighted graph from input
input = input.map((row, i) => {
    return row.map((col, j) => new Point(i, j, col))
});
const startPoint = input.flat().find(x => x.h === 'S'.charCodeAt(0));
const endPoint = input.flat().find(x => x.h === 'E'.charCodeAt(0));
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        const links = [];
        if (i > 0)
            links.push(input[i - 1][j]);
        if (i < input.length - 1)
            links.push(input[i + 1][j]);
        if (j > 0)
            links.push(input[i][j - 1]);
        if (j < input[0].length -1)
            links.push(input[i][j + 1]);

        links.forEach(l => {
            if (input[i][j].getLinkWeight(l) <= 1) {
                input[i][j].addLink(l);
            }
        })
    }
}
startPoint.score = 0;

// console.log(input.flat().find(x => x.links.size === 0));
// process.exit(0);

// Apply Dijkstra algo
function findScores(point) {
    const links = [...point.links].sort((a, b) => b.getLinkWeight(point) - a.getLinkWeight(point));

    for (const link of links) {
        if (!link.isVisited) {
            if (point.score + point.getLinkWeight(link) < link.score) {
                link.score = point.score + point.getLinkWeight(link);
                findScores(link);
            }
        }
    }
    point.isVisited = true;

    // START Print
    console.clear();
    let out = '';
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            out += input[i][j].isVisited ? '+' : '#';
        }
        out += '\n';
    }
    process.stdout.write(out);
    for (let i = 0; i < 30000000; i++);
    // END Print
}
findScores(startPoint);
// Find path
// function findPath(point, prevPoint) {
//     const path = '';
//     const links = [...point.links].sort((a, b) => a.score - b.score);
//     const nextPoint = links.find(p => p !== endPoint && p !== prevPoint);
//     if (point === startPoint) {
//         return;
//     }
//     findPath(nextPoint, point);
//     console.log(point.i, point.j);
// }
// const p = findPath(endPoint);

