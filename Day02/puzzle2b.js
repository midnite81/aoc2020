let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let passwords = dataFile.split('\n');

if (passwords[passwords.length-1] === "") {
    passwords.splice(passwords.length - 1, 1);
}

let success = 0;

function matchesRequirements(word, char, pos1, pos2) {
    return (
        (word[pos1 - 1] === char && word[pos2 - 1] !== char) ||
        (word[pos1 - 1] !== char && word[pos2 - 1] === char)
    );
}

passwords.forEach(word => {
    let parts = word.split(':');
    let occurrence = parts[0].split(' ')[0];
    let pos1 = occurrence.split('-')[0];
    let pos2 = occurrence.split('-')[1];
    let char = parts[0].split(' ')[1];
    let password = parts[1].trim();

    if (matchesRequirements(password, char, pos1, pos2)) {
        success++;
    }
})

console.log(`Total number matching is ${success}`);
console.log(`Total Passwords: ${passwords.length}`);
