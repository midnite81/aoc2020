let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let passwords = dataFile.split('\n');

if (passwords[passwords.length-1] === "") {
    passwords.splice(passwords.length - 1, 1);
}

let success = 0;

function matchesRequirements(word, char, min, max) {
    let letterCount = word.split(new RegExp( char, "gi" )).length - 1;
    return letterCount >= min && letterCount <= max;
}

passwords.forEach(word => {
    let parts = word.split(':');
    let occurrence = parts[0].split(' ')[0];
    let min = occurrence.split('-')[0];
    let max = occurrence.split('-')[1];
    let char = parts[0].split(' ')[1];
    let password = parts[1].trim();

    if (matchesRequirements(password, char, min, max)) {
        success++;
    }
})

console.log(`Total number matching is ${success}`);
console.log(`Total Passwords: ${passwords.length}`);
