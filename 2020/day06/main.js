const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n\n');

console.log('Hello AOC 2020 Day 6');

// console.log(inputs);

let part1Answer = 0;
inputs.forEach(input => {
    const inputArr = input.replaceAll('\n', '').split("");
    const uniqueChars = inputArr.filter(findUnique);
    // console.log(uniqueChars);
    part1Answer += uniqueChars.length;
});

console.log('Part 1 Answer:', part1Answer);

function findUnique(value, index, self) {
    return self.indexOf(value) === index;
}

let part2Answer = 0;

inputs.forEach(input => {
    const numOfPerson = (input.match(/\n/g) || []).length + 1;
    // console.log('Number of people:', numOfPerson);

    const inputArr = input.replaceAll('\n', '').split("").sort();
    // console.log('inputArr:', inputArr);

    const uniqueChars = inputArr.filter(findUnique);

    let numOfSomething = 0;
    uniqueChars.forEach(uniqueChar => {
        const numOfAnswer = countAnswers(inputArr, uniqueChar);
        // console.log('Number of Answer:', numOfAnswer);
        if (numOfPerson == numOfAnswer) numOfSomething += 1;
    });

    part2Answer += numOfSomething;
});

function countAnswers(inputArr, value) {
    return inputArr.reduce((count, val) => (val === value ? count + 1 : count), 0);
}

console.log('Part 2 Answer:', part2Answer);