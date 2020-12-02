const fs = require('fs')

console.log('Hello AOC 2020 Day 2');

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

const parser = /^(\d+)-(\d+)\s+([a-z]):\s+([a-z]+)$/;

const resultArray = inputs.filter((str) => {
    const [, min, max, char, pass] = str.match(parser);
    return processData(min, max, char, pass);
});

console.log(resultArray);
console.log('Answer is:', resultArray.length);

function processData(min, max, char, pass) {
    // console.log('Processing: ', min, max, char, pass);

    // Part 1:
    // const regexp = new RegExp(`${char}`, 'g');
    // var count = (pass.match(regexp) || []).length;
    // console.log('Number found:', count);
    // return count >= min && count <= max;

    // Part 2:
    return pass[min-1] === char ^ pass[max-1] === char;
}
