const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number);

console.log('Hello AOC 2020 Day 9');

// console.log(inputs);

const PREAMBLE = 25;
let index = 0;
let part1Answer = 0;
while(index <= inputs.length) {
    const numberToCheckIndex = index + PREAMBLE;
    const arrayToCheck = inputs.slice(index, numberToCheckIndex);
    const numberToCheck = inputs[numberToCheckIndex];

    // console.log('Checking number: ' + numberToCheck + ' with array: ', arrayToCheck);

    const found = hasTwoToSum(arrayToCheck, numberToCheck);

    if (!found) {
        part1Answer = numberToCheck;
        break;
    }

    index = index + 1;
}

console.log('Part 1 Answer is: ', part1Answer);

function hasTwoToSum(array, sumNumber) {
    let leftIndex = 0;
    let rightIndex = array.length - 1;
    array.sort((a, b) => a - b);

    while (leftIndex < rightIndex) {
        if (array[leftIndex] + array[rightIndex] == sumNumber) return true;
        else if (array[leftIndex] + array[rightIndex] < sumNumber) leftIndex++;
        else rightIndex--;
    }

    return false;
}

let leftIndex = 0;
let part2Answer = 0;
while (leftIndex < inputs.length) {
    let sumNumber = 0;
    let rightIndex = leftIndex + 1;
    let arrayToCheck = [];

    while(rightIndex < inputs.length) {
        arrayToCheck = inputs.slice(leftIndex, rightIndex);
        // console.log('Checking array:', arrayToCheck);

        sumNumber = arrayToCheck.reduce((total, currentValue) => total + currentValue);
        // console.log('... and produces:', sumNumber);

        if (sumNumber >= part1Answer) break;

        rightIndex++;
    }

    if (sumNumber == part1Answer) {
        part2Answer = Math.min(...arrayToCheck) + Math.max(...arrayToCheck);
        // console.log('Found answer:', part2Answer);
        break;
    }

    leftIndex++;
}

console.log('Part 2 Answer is: ', part2Answer);