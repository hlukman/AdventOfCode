const fs = require('fs')

console.log('Hello AOC 2020 Day 1');

let inputFile = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number);

processFile(inputFile);

function processFile(data) {
    let found = false;
    for (let firstIndex = 0; firstIndex < data.length; firstIndex++) {
        for (let secondIndex = 0; secondIndex < data.length; secondIndex++) {
            for (let thirdIndex = 0; thirdIndex < data.length; thirdIndex++) {
                // console.log('Indices:', firstIndex, secondIndex, thirdIndex);
                const foundAnswer = calculate(data[firstIndex], data[secondIndex], data[thirdIndex]);
                if (foundAnswer) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        if (found) break;
    }
}

function calculate(firstNumber, secondNumber, thirdNumber) {
    const value = firstNumber + secondNumber + thirdNumber;
    if (value == 2020) {
        const answerValue = firstNumber * secondNumber * thirdNumber;
        console.log('Found! values:', firstNumber, secondNumber, thirdNumber);
        console.log('Answer:', answerValue);
        return answerValue;
    }
    return null;
}