// This file still requires work as provides an incorrect answer

let fs = require('fs');

let dataFile = fs.readFileSync(__dirname + '/data.txt').toString();
let passports = dataFile.split('\n\n');
let numberOfValidPassports = 0;

function propertiesValid(passport) {
    let valid = true;
    
    /**
     * byr (Birth Year) - four digits; at least 1920 and at most 2002.
     */
    if (!passport.hasOwnProperty('byr') ||
        !(passport.byr >= 1920 && passport.byr <= 2002)) {
        console.log(`birth year failed (1920-2002): ${passport.byr}`);
        return false;
    }

    /**
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    */
    if (!passport.hasOwnProperty('iyr') ||
        !(passport.iyr >= 2010 && passport.iyr <= 2020)) {
        console.log(`issue year failed (2010-2020): ${passport.iyr}`);
        return false;
    }

    /**
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    */
    if (!passport.hasOwnProperty('eyr') ||
        !(passport.eyr >= 2020 && passport.eyr <= 2030)) {
        console.log(`expire year failed 2020-2030: ${passport.eyr}`);
        return false;
    }

    /**
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    */
    if (!passport.hasOwnProperty('hgt')) {
        console.log(`height failed: no prop`);
        return false;
    }

    if (passport.hgt.includes('cm') &&
        !(parseInt(passport.hgt) >= 150 && parseInt(passport.hgt) <= 193)) {
        console.log(`cm height failed 150-193: ${passport.hgt}`);
        return false;
    }

    if (passport.hgt.includes('in') &&
        !(parseInt(passport.hgt) >= 59 && parseInt(passport.hgt) <= 76)) {
        console.log(`in height failed 59-76: ${passport.hgt}`);
        return false;
    }

    /**
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    */
    if (!passport.hasOwnProperty('hcl') ||
        !(/^(#[0-9a-f]{6})$/.test(passport.hcl))) {
        console.log(`hair colour failed hex: ${passport.hcl}`);
        return false;
    }
    
    /**
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    */
    if (!passport.hasOwnProperty('ecl') ||
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(passport.ecl) < 0) {
        console.log(`eye color failed: ${passport.ecl}`);
        return false;
    }

    /**
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    */
    if (!passport.hasOwnProperty('pid') ||
        !(/[0-9]{9}/.test(passport.pid))) {
        console.log(`passport id failed 9 chars: ${passport.pid}`);
        return false;
    }

    /**
    cid (Country ID) - ignored, missing or not.
    */


    return valid
}

passports.forEach(passport => {
    let passportData = passport
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .split(' ')
        .reduce((map, obj) => {
            let data = obj.split(':');
            map[data[0]] = data[1];
            return map;
        }, {});


    if (propertiesValid(passportData)) {
        numberOfValidPassports++;
    }
});

console.log(`There are ${numberOfValidPassports} valid passports`);
console.log(`Out of a total of ${passports.length}`);
