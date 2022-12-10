const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split('\n').map(x => x.split(' '));

const cmp = (o1, o2) => Object.keys(o1).reduce((p, c) => p && o1[c] === o2[c], true);

let steps = input.reduce((p, [dir, steps]) => {
    for (let i = 0; i < Number(steps); i++) {
        p.push({...p.at(-1)});
        if (dir === 'U')
            p.at(-1).y += 1;
        if (dir === 'R')
            p.at(-1).x += 1;
        if (dir === 'D')
            p.at(-1).y -= 1;
        if (dir === 'L')
            p.at(-1).x -= 1;
    }
    return p;
}, [{x: 0, y: 0}]);

let tails = new Array(10).fill(steps[0]);
steps.forEach((step, index) => {

    for (let i = 1; i < 10; i++) {
        const prevStep = tails[i - 1];
        tails[0] = step;
        if (
            !(
                cmp(tails[i], tails[i - 1])
                || cmp({x: tails[i].x, y: tails[i].y + 1}, tails[i - 1])
                || cmp({x: tails[i].x + 1, y: tails[i].y}, tails[i - 1])
                || cmp({x: tails[i].x - 1, y: tails[i].y}, tails[i - 1])
                || cmp({x: tails[i].x, y: tails[i].y - 1}, tails[i - 1])
                || cmp({x: tails[i].x + 1, y: tails[i].y + 1}, tails[i - 1])
                || cmp({x: tails[i].x + 1, y: tails[i].y - 1}, tails[i - 1])
                || cmp({x: tails[i].x - 1, y: tails[i].y + 1}, tails[i - 1])
                || cmp({x: tails[i].x - 1, y: tails[i].y - 1}, tails[i - 1])
            )
        ) {
            if (i === 9) {
                tails[i].tailed = true;
            }
            tails[i] = prevStep;
            break;
        }
    }

    console.log(tails);
});

console.log((new Set([...steps.filter(s => s.tailed).map(s => `${s.x}${s.y}`)])).size);
