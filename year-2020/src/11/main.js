const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n')
const seatsMap = {'#': 1, 'L': 0, '.': null};

class Place {
    nextState = null;
    seatState = null;
    adjacents = [];
}

const places = new Array(input.length).fill(null).map(() => {
    return new Array(input[0].length).fill(null).map(() => new Place())
});

// Seats graph
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        places[i][j].seatState = seatsMap[input[i][j]];
        places[i][j].nextState = seatsMap[input[i][j]];

        const adjacentsCoords = [-1, 0, 1];
        adjacentsCoords.forEach(x => {
            adjacentsCoords.forEach(y => {
                if ((x || y) && places[i + x]?.[j + y] !== undefined) {
                    places[i][j].adjacents.push(places[i + x][j + y]);
                }
            })
        })
    }
}

let changes, prevChanges;
do {
    prevChanges = changes;
    changes = 0;
    places.forEach(row => {
        row.forEach(place => {
            if (place.seatState !== null) {
                const occupied = place.adjacents.filter(p => p.seatState === 1).length;
                if (occupied === 0) {
                    place.nextState = 1;
                    changes++;
                } else if (occupied >= 4) {
                    place.nextState = 0;
                    changes++;
                }
            }
        });
    });

    places.forEach(row => row.forEach(p => p.seatState = p.nextState));
} while (changes !== prevChanges);


const totalOccupied = places.reduce((p, c) => {
    return p + c.reduce((p, c) => p + (c.seatState ? 1 : 0), 0);
}, 0);
console.log(totalOccupied);

