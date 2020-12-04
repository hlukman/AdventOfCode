const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n\n');

console.log('Hello AOC 2020 Day 4 - Part 1');

// console.log(inputs);

const cleanDatas = [];
for(const input of inputs) {
    const cleanData = input.split(/[\s\n:]+/);
    cleanDatas.push(cleanData);
}

let numOfValidPassports = 0;
for(const cleanData of cleanDatas) {
    const numOfData = cleanData.length;

    // console.log("Processing: ", cleanData);

    if (numOfData == 16) {
        numOfValidPassports++;
    } else if (numOfData == 14) {
        if (!cleanData.includes('cid')) {
            numOfValidPassports++;
        }
    }
}

console.log("Number of valid passports:", numOfValidPassports);
