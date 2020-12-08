const fs = require('fs')

let inputs = fs.readFileSync('sample.txt', 'utf8').split('\n');

console.log('Hello AOC 2020 Day 7 - Part 2');

// console.log(inputs);

class Bag {
    constructor(color, amount) {
        this.color = color;
        this.amount = amount;
        this.contains = [];
    }

    addChild(color, amount) {
        const existColor = this.contains.filter((bag) => bag.color === color);

        if (existColor.length == 0) {
            const newBag = new Bag(color, amount);
            this.contains.push(newBag);

            // console.log('Color ' + color + ' added - bag now contains:', this.contains);
        } 
    }
}

let bagsMap = new Map();

inputs.forEach((input) => {
    const [, keyColor, childColorsSentence] = input.match(/(\w+ \w+) bags contain (.*)\./);

    // console.log('keyColor:', keyColor);
    // console.log('childColorsSentence', childColorsSentence);

    const bag = new Bag(keyColor, 0);

    if (childColorsSentence !== 'no other bags') {
        const childColorsSentences = childColorsSentence.split(', ');

        childColorsSentences.forEach((childColor) => {
            const bagDescription = childColor.match(/(\d+) (\w+ \w+) bags?/);
            const amount = bagDescription[1];
            const color = bagDescription[2];
            bag.addChild(color, amount);
        });
    }

    bagsMap.set(keyColor, bag);
});

// console.log('bagsMap now:', bagsMap);

const shinyGoldBag = bagsMap.get('shiny gold');
console.log('Shiny gold bag has: ' + calculateAllChildBags(shinyGoldBag, bagsMap, 0) + ' total bags');


function calculateAllChildBags(currentBag, bagsMap) {
    console.log('Processing for color:', currentBag);

    // const currentBagAmount = parseInt(currentBag.amount);
    // console.log('which has amount:', currentBagAmount);

    if (currentBag.contains.length == 0) {
        console.log('No more children, returning:', currentBag.amount);
        return parseInt(currentBag.amount) || 1;
    }

    let totalChildBags = 0;
    currentBag.contains.forEach((bag) => {
        const actualBag = bagsMap.get(bag.color);
        console.log('actualBag:', actualBag);
        const bagAmount = parseInt(bag.amount);
        console.log('bagAmount:', bagAmount);

        // totalBags = totalBags + bagAmount;
        // totalBags = totalBags + (bagAmount * calculateAllChildBags(actualBag, bagsMap, totalBags));

        totalChildBags = totalChildBags + (bagAmount * calculateAllChildBags(actualBag, bagsMap));
    });

    // previousAmount = previousAmount + totalChildBags;
 
    return totalChildBags;
}