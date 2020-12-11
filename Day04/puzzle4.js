let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let passports = dataFile.split('\n\n');
let numberOfValidPassports = 0;

let requiredProperties = [
    'ecl',
    'pid',
    'eyr',
    'hcl',
    'byr',
    'iyr',
    'hgt',
];

passports.forEach(passport => {
    let valid = requiredProperties.every(requiredProperty => {
        return passport.indexOf(requiredProperty) > -1
    })

    if (valid) {
        numberOfValidPassports++;
    }
});

console.log(`There are ${numberOfValidPassports} valid passports`);
console.log(`Out of a total of ${passports.length}`);
