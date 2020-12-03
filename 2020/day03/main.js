const fs = require('fs')

console.log('Hello AOC 2020 Day 3 - Part 1');

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

const numberOfTrees = figureItOut(3, 1);

console.log('Answer number of trees:', numberOfTrees);

console.log('Hello AOC 2020 Day 3 - Part 2');

const part2Answer = figureItOut(1, 1) * figureItOut(3, 1) * figureItOut(5, 1) * figureItOut(7, 1) * figureItOut(1, 2);

console.log('Answer Part 2:', part2Answer);

function figureItOut(right, down) {
    // formula: index * right
    let numberOfTrees = 0;
    let index = 0;

    for(const input of inputs) {
        if(index % down == 0) {
            const lineLength = input.length;
            let charPosition = (index / down) * right;
            let character = input.charAt(charPosition % lineLength);

            if (character === '#') numberOfTrees++;
        }

        index++;
    }

    return numberOfTrees;
}