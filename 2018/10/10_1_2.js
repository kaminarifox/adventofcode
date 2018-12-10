const fs = require('fs');
const rl = require('readline');

rl.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {

    if (key.name === 'left') {
        draw('prev', 1);
        seconds -= 1;
    } else if (key.name === 'right') {
        draw('next', 1);
        seconds += 1;
    } else if (key.name === 'up') {
        draw('next', 100);
        seconds += 100;
    } else if (key.name === 'down') {
        draw('prev', 100);
        seconds -= 100;
    }
 
    if (key.ctrl && key.name === 'c') {
        console.log(seconds);
        process.exit();
    } 
});

const input = fs.readFileSync('in.txt', 'utf8').trim().split('\n');
let seconds = 0;

class Point {

    constructor(x, y, xVel, yVel) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.xVel = parseInt(xVel);
        this.yVel = parseInt(yVel);
    }

    next(n) { this.x += this.xVel * n; this.y += this.yVel * n; }
    prev(n) { this.x -= this.xVel * n; this.y -= this.yVel * n; }
}

const points = [];
input.forEach(item => {    
    const p = item.match(/-?\d+/g);
    points.push(new Point(...p));
});

function draw(direction, n) {

    console.log('\033[2J');
    out = ''

    if (direction === 'next') {
        points.forEach(p => p.next(n));
    } else if (direction === 'prev') {
        points.forEach(p => p.prev(n));
    }

    for (let i = points[50].y - 40; i < points[50].y + 30; i++) {
        let inline = 0;

        for (let j = points[50].x - 40; j < points[50].x + 100; j++) {

            let exist = false;

            for (let k = 0; k < points.length; k++) {
                if (points[k].x === j && points[k].y === i) {
                    out += '#';
                    exist = true;
                    inline++;
                    break;
                }
            }

            if (!exist) out += '.'
        }
        out += ` ${inline}\n`;
    }

    process.stdout.write(out);
}