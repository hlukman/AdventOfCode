const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n\n');

console.log('Hello AOC 2020 Day 4 - Part 2');

// console.log(inputs);

const cleanDatas = [];
for(const input of inputs) {
    const cleanData = input.split(/[\s\n]+/);
    const cleanMap = new Map();

    for (const data of cleanData) {
        const cleanerData = data.split(':');
        cleanMap.set(cleanerData[0], cleanerData[1]);
    }

    cleanDatas.push(cleanMap);
}

// console.log(cleanDatas);

let numOfValidPassports = 0;

cleanDatas.forEach(cleanData => {
    // console.log('Processing:', cleanData);

    // Check for obvious invalids:
    if (cleanData.size < 7) {
        // console.log('Less than 7 data, so definite invalid');
        return;
    }

    // Check for exactly 7 data but has cid:
    if (cleanData.size == 7 && cleanData.has('cid')) {
        // console.log('Has 7 data and has cid, so missing one valid data, thus invalid!');
        return;
    }

    // console.log('Need to check the rest...');
    // Process the rest maybes:
    let validPassports = [];

    if (cleanData.has('byr')) {
        validPassports.push(validateByr(cleanData.get('byr')));
    }

    if (cleanData.has('iyr')) {
        validPassports.push(validateIyr(cleanData.get('iyr')));
    }

    if (cleanData.has('eyr')) {
        validPassports.push(validateEyr(cleanData.get('eyr')));
    }

    if (cleanData.has('hgt')) {
        validPassports.push(validateHgt(cleanData.get('hgt')));
    }

    if (cleanData.has('hcl')) {
        validPassports.push(validateHcl(cleanData.get('hcl')));
    }

    if (cleanData.has('ecl')) {
        validPassports.push(validateEcl(cleanData.get('ecl')));
    }

    if (cleanData.has('pid')) {
        validPassports.push(validatePid(cleanData.get('pid')));
    }

    // console.log('Result:', validPassports);

    if (!validPassports.includes(false) && !validPassports.includes(null)) {
        // console.log('... looks like still valid!')
        numOfValidPassports++;
    }
});

console.log("Number of valid passports:", numOfValidPassports);

function validateByr(string) {
    const number = parseInt(string);
    return !!string.match(/^[0-9]{4}$/) && number >= 1920 && number <= 2002;
}

function validateIyr(string) {
    const number = parseInt(string);
    return !!string.match(/^[0-9]{4}$/) && number >= 2010 && number <= 2020;
}

function validateEyr(string) {
    const number = parseInt(string);
    return !!string.match(/^[0-9]{4}$/) && number >= 2020 && number <= 2030;
}

function validateHgt(height) {
    const cm = height.match(/(\d*)cm/);
    if (cm) {
        const number = parseInt(cm[1]);
        return number >= 150 && number <= 193;
    }

    const inch = height.match(/(\d*)in/);
    if (inch) {
        const number = parseInt(inch[1]);
        return number >= 59 && number <= 76;
    }

    return false;
}

function validateHcl(color) {
    return color.match(/^#[0-9a-f]{6}$/);
}

function validateEcl(color) {
    return color.match(/amb|blu|brn|gry|grn|hzl|oth/);
}

function validatePid(pid) {
    return pid.match(/^[0-9]{9}$/);
}