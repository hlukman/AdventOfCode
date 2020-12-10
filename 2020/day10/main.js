const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number);

console.log('Hello AOC 2020 Day 10');

// console.log(inputs);

let joltMap = new Map().set(1, 0).set(2, 0).set(3, 0);
const sortedInputs = inputs.sort((a, b) => a - b);
sortedInputs.unshift(0);
const deviceValue = sortedInputs[sortedInputs.length - 1];
sortedInputs.push(deviceValue + 3);

// console.log(sortedInputs);

for (let i = 0; i < sortedInputs.length; i++) {
    const joltDiff = sortedInputs[i] - sortedInputs[i - 1];

    if (joltDiff > 0 && joltDiff <= 3) {
        const value = joltMap.get(joltDiff);
        joltMap.set(joltDiff, value + 1);
    }
}

// console.log(joltMap);

const part1Answer = joltMap.get(1) * joltMap.get(3);

console.log('Part 1 Answer: ', part1Answer);

const calculatedPaths = new Array(sortedInputs.length).fill(0);
calculatedPaths[0] = 1;

for (let i = 0; i < sortedInputs.length; ++i) {
    for (let j = i + 1; j < sortedInputs.length; ++j) {
        // console.log(sortedInputs[j], sortedInputs[i]);
        if (sortedInputs[j] - sortedInputs[i] > 3) break;
        calculatedPaths[j] = calculatedPaths[j] + calculatedPaths[i];
    }
}

// console.log(calculatedPaths);

const part2Answer = calculatedPaths[calculatedPaths.length - 1];

console.log('Part 2 Answer: ', part2Answer);
