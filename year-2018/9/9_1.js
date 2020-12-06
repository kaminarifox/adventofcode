const players = 428;
const last = 72061;
const score = new Array(players).fill(0);

let circle = [0];
let currentIndex  = 0;

function getNext(index) {
    return index <= circle.length ? index : index - circle.length;
}

for (let i = 1; i <= last; i++) {

    let currentP = (i - 1) % players;

    if (i % 23 === 0) {
        score[currentP] += i;
        currentIndex -= 7;
        currentIndex = currentIndex < 0 ? circle.length + currentIndex : currentIndex;
        score[currentP] += circle.splice(currentIndex, 1).pop();
        continue;
    }

    let insert = getNext(currentIndex + 2);
    circle.splice(insert, 0, i)
    currentIndex = insert;
}

console.log(score.sort().pop());