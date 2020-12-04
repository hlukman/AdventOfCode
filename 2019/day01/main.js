const fs = require('fs')

console.log('Hello AOC 2019 Day 1');

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

let totalValue1 = 0;
let totalValue2 = 0;
inputs.forEach(input => {
    const value = parseInt(input);
    const result1 = Math.floor(value / 3) - 2;
    totalValue1 += result1;
    // console.log(value, result1, totalValue1);

    const result2 = calculateFuelWeight(value);
    totalValue2 += result2;
    // console.log(value, result2, totalValue2);
});

console.log("Part 1 answer: ", totalValue1);
console.log("Part 2 answer: ", totalValue2);

function calculateFuelWeight(value) {
    let result = Math.floor(value / 3) - 2;
    // console.log(value, result);
    if (result > 0) result += calculateFuelWeight(result);
    else return 0;

    return result;
}
