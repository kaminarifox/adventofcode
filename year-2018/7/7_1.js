import fs from 'fs';

let input =
`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n');

let out = '';

input.forEach(item => {

    const step = item.match(/[A-Z]/g);
    let s1 = step[1], s2 = step[2];

    if (!out.length) {
        out += s1;
    }

    input.forEach(item2 => {

    });
});