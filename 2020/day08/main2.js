const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

console.log('Hello AOC 2020 Day 8 - Part 2');

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

function createFreshOperationSteps() {
    const OperationSteps = [];
    inputs.forEach((input) => {
        const [, operation, steps] = input.match(/(\w+) ([+-]\d*)/);
        // console.log("Operation: " + operation + " with steps: " + steps);
        OperationSteps.push(new Operation(operation, parseInt(steps)));
    });
    
    return OperationSteps;
}

function runTest(operationSteps) {
    let index = 0;
    let accumulator = 0;

    while(true) {
        // console.log('Working on index:', index);
        if (index === operationSteps.length) return accumulator;
        if (index > operationSteps.length) return false;

        const currentOperation = operationSteps[index];

        if (currentOperation.alreadyRun) return false;

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
    }
}

const OperationSteps = createFreshOperationSteps();
// console.log('OperationSteps:', OperationSteps);

OperationSteps.forEach((operationStep, index) => {
    const copyOfOpSteps = createFreshOperationSteps();

    // console.log('Processing: ', index, operationStep);

    if (operationStep.operation === 'nop') {
        copyOfOpSteps[index].operation = 'jmp';
    } else if (operationStep.operation === 'jmp') {
        copyOfOpSteps[index].operation = 'nop';
    }

    // console.log('Running test on:', copyOfOpSteps);

    let result = runTest(copyOfOpSteps);
    // console.log('result: ', result);

    if (result) console.log('Accumulator is at: ', result);
});
