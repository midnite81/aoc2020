let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let _map = dataFile.split('\n');

if (_map[_map.length-1] === "") {
    _map.splice(_map.length - 1, 1);
}


function treesOnRoute(xIncrement, yIncrement) {

    let map = [..._map];

    let x = 0;
    let y = 0;
    let treesEncountered = 0;
    let tree = '#';

    for (let i = 0; i < map.length; i++) {
        x = x + xIncrement;
        y = y + yIncrement;

        if (y < map.length) {
            while (typeof map[y][x-1] === 'undefined' || typeof map[y][x+1] === 'undefined') {
                map[y] += map[y];
            }

            if (map[y][x] === tree) {
                treesEncountered++;
            }
        }
    }

    return treesEncountered;
}

console.log(`Total Trees Counted ${treesOnRoute(3,1)}`);
