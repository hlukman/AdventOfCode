const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

console.log('Hello AOC 2020 Day 7 - Part 1');

// console.log(inputs);

class Bag {
    constructor(color) {
        this.color = color;
        this.canBeContainedBy = [];
    }

    addParent(color) {
        if (!this.canBeContainedBy.includes(color)) {
            this.canBeContainedBy.push(color);
        }
    }
}

let bagsMap = new Map();

function addToBagMap(color, parentColor) {
    if (bagsMap.has(color)) {
        const bag = bagsMap.get(color);
        bag.addParent(parentColor);
    } else {
        const newBag = new Bag(color);
        newBag.addParent(parentColor);
        bagsMap.set(color, newBag);
    }

    // console.log('Added to bagsMap:', color);
    // console.log('bagsMap now:', bagsMap);
}

inputs.forEach((input) => {
    const [, keyColor, childColorsSentence] = input.match(/(\w+ \w+) bags contain (.*)\./);

    // console.log('keyColor:', keyColor);
    // console.log('childColorsSentence', childColorsSentence);

    const childColorsSentences = childColorsSentence.split(', ');

    childColorsSentences.forEach((childColor) => {
        const color = childColor.match(/(\w+ \w+) bags?/)[1];
        // console.log('color - ', color);
        addToBagMap(color, keyColor);
    });
});

// console.log('bagsMap now:', bagsMap);

function findUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function expandBagMap(color, originalColor) {
    const bag = bagsMap.get(color);

    const parentColors = bag.canBeContainedBy;
    // console.log('Parent Colors:', parentColors);

    parentColors.forEach((parentColor) => {
        // console.log('Adding ' + parentColor + ' to the list...');

        addToBagMap(originalColor, parentColor);
        // console.log('Parents bag now:', bag.canBeContainedBy);

        if (bagsMap.has(parentColor)) {
            expandBagMap(parentColor, originalColor);
        }
    });
}

const shinyGoldBag = bagsMap.get('shiny gold');

expandBagMap('shiny gold', 'shiny gold');

// console.log('Shiny gold now has as parents:', shinyGoldBag.canBeContainedBy);

const uniqueBags = shinyGoldBag.canBeContainedBy.filter(findUnique);

console.log('Part 1 Answer:', uniqueBags.length);