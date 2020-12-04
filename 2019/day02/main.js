const fs = require('fs')

console.log('Hello AOC 2019 Day 2');

let inputs = fs.readFileSync('input.txt', 'utf8').split(',').map(Number);

// console.log(inputs);

const getNextIndex = (currentIndex) => {
    return currentIndex + 4;
}

const figureItOut = (input, mod1, mod2) => {
    // console.log("Input array is: ", input);

    if(mod1 && mod2) {
        input[1] = mod1;
        input[2] = mod2;
        // console.log("Input array with mod is: ", input);
    }

    let currentIndex = 0;
    while(currentIndex < input.length && input[currentIndex] != 99) {

        const opCode = input[currentIndex];
        const firstInput = input[currentIndex + 1];
        const secondInput = input[currentIndex + 2];
        const output = input[currentIndex + 3];

        if (opCode == 1) {
            input[output] = input[firstInput] + input[secondInput];
        } else if (opCode == 2) {
            input[output] = input[firstInput] * input[secondInput];
        }

        currentIndex = getNextIndex(currentIndex);
    }

    // console.log("Now the array is:", input);
    return input[0];
}

const part2Logic = () => {
    const desireOutput = 19690720;
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {   
            const output = figureItOut([...inputs], i, j);
            if(output == desireOutput) {
                console.log("Found Part 2: ", i, j);
                return;
            }     
        }   
    }
}

// const sample1 = [1,0,0,0,99];
// const sample2 = [2,3,0,3,99];
// const sample3 = [2,4,4,5,99,0];
// const sample4 = [1,1,1,4,99,5,6,0,99];

// figureItOut(sample1);
// figureItOut(sample2);
// figureItOut(sample3);
// figureItOut(sample4);

console.log("No input: ", figureItOut([...inputs]));
console.log("1202 input (Part 1 Answer): ", figureItOut([...inputs], 12, 2));

part2Logic();
