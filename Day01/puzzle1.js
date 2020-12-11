let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let data = dataFile.split('\n');

let foundNumbers = [];

data.forEach(number => {
    data.forEach(number2 => {
        if (parseInt(number) + parseInt(number2) === 2020) {
            if (!foundNumbers.includes(number)) {
                console.log(`Number added ${number}`);
                foundNumbers.push(number);
            }
            if (!foundNumbers.includes(number2)) {
                console.log(`Number added ${number2}`);
                foundNumbers.push(number2);
            }
        }
    })
});

let answer = foundNumbers.reduce((a, b) => a * b);
console.log(`The answer is: ${answer}`);
// 440979

