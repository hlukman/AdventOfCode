const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

console.log('Hello AOC 2020 Day 8 - Part 1');

// console.log(inputs);

class Operation {
    constructor (operation, steps) {
        this.operation = operation;
        this.steps = steps;
        this.alreadyRun = false;
    }

    active() {
        this.alreadyRun = true;
    }
}

const OperationSteps = [];
let accumulator = 0;

inputs.forEach((input) => {
    const [, operation, steps] = input.match(/(\w+) ([+-]\d*)/);
    // console.log("Operation: " + operation + " with steps: " + steps);
    OperationSteps.push(new Operation(operation, parseInt(steps)));
});

// console.log('OperationSteps:', OperationSteps);

let circuitBreaker = true;
let index = 0;

while (circuitBreaker) {
    const currentOperation = OperationSteps[index];

    // console.log('Current Operation: ', currentOperation, index);

    if (currentOperation.alreadyRun) {
        circuitBreaker = false;

    } else {
        currentOperation.active();

        switch(currentOperation.operation) {
            case 'acc': 
                accumulator = accumulator + currentOperation.steps;
                index += 1;
                break;
            case 'jmp':
                index += currentOperation.steps;
                break;
            case 'nop':
            default:
                index += 1;
                break;
        } 

        // console.log('Accumulator now is at: ', accumulator);
    }
}

console.log('Accumulator is at: ', accumulator);