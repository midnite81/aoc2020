let fs = require('fs');

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {
        return Array(Math.ceil(this.length / n)).fill().map((_, i) => this.slice(i * n, i * n + n));
    }
});

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let codes = dataFile.split('\n');

function calculatePosition(code) {
    let rows = [...Array(128).keys()];
    let cols = [...Array(8).keys()];

    code.split('').forEach(char => {
        let rowChunks = rows.chunk(rows.length / 2);
        let colChunks = cols.chunk(cols.length / 2);

        switch (char) {
            case "B":
                rows = rowChunks[1];
                break;
            case "F":
                rows = rowChunks[0];
                break;
            case "R":
                cols = colChunks[1];
                break;
            case "L":
                cols = colChunks[0];
                break;
        }
    });

    return {
        row: rows[0],
        col: cols[0],
        seatId: rows[0] * 8 + cols[0]
    };
}

let seatIds = codes.map(code => {
    let pos = calculatePosition(code);
    return pos.seatId;
});

console.log(seatIds.reduce((previousValue, currentValue) =>
    previousValue > currentValue ? previousValue : currentValue)
);
