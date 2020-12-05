const fs = require('fs')

let inputs = fs.readFileSync('input.txt', 'utf8').split('\n');

console.log('Hello AOC 2020 Day 5');

// console.log(inputs);

const rowSeatArray = [...Array(128).keys()];
const columnSeatArray = [...Array(8).keys()];

let seatIds = [];
inputs.forEach(input => {
    const ticket = input.split('');

    const rowNumber = findRow(rowSeatArray, ticket, 0);
    const columnNumber = findColumn(columnSeatArray, ticket, 7);
    const seatId = (rowNumber * 8) + columnNumber;

    // console.log('Row: ' + rowNumber + ' - Column: ' + columnNumber + ' - SeatID: ' + seatId);
    seatIds.push(seatId);
});

console.log('Part 1 - Highest seat ID is: ', Math.max(...seatIds));

let sortedSeatIds = seatIds.sort((a, b) => a - b);

const seatsAroundMe = sortedSeatIds.filter((seatId, index, array)=>{
    // Remove the front and back seats
    if (index == 0 || index == array.length-1) return false;

    return !(seatId == parseInt(array[index + 1] - 1) && seatId == parseInt(array[index - 1] + 1));
});

// console.log(seatsAroundMe);

console.log("Part 2 - My Seat ID is: ", parseInt(seatsAroundMe[0] + 1));

function findRow(seatArray, ticket, letterIndex) {
    if (seatArray.length == 1) return seatArray[0];

    let newSeatArray = [];
    if (ticket[letterIndex] === 'F') {
        newSeatArray = seatArray.slice(0, seatArray.length / 2);
    } else {
        newSeatArray = seatArray.slice(seatArray.length / 2);
    }

    // console.log('After splitting:', ticket[letterIndex], newSeatArray);
    return findRow(newSeatArray, ticket, letterIndex + 1);
}

function findColumn(seatArray, ticket, letterIndex) {
    if (seatArray.length == 1) return seatArray[0];

    let newSeatArray = [];
    if (ticket[letterIndex] === 'L') {
        newSeatArray = seatArray.slice(0, seatArray.length / 2);
    } else {
        newSeatArray = seatArray.slice(seatArray.length / 2);
    }

    // console.log('After splitting:', ticket[letterIndex], newSeatArray);
    return findColumn(newSeatArray, ticket, letterIndex + 1);
}

