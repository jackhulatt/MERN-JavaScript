// Array API
// - push, pop, shift, splice, slice

const arr = [];
// push appends to the end of the array
console.log("PUSH")
arr.push(1);
arr.push(2);
console.log(arr);

// pop removes an item from the end of the end of the array
// - and returns it
console.log("POP")
const endOfArr = arr.pop();
console.log(`Popped ${endOfArr}`);
console.log(arr);

// shift removes an item from the start of the array
// - returns the item
console.log("SHIFT")
const startOfArr = arr.shift();
console.log(startOfArr);

console.log(`Array should be empty: [${arr}]`);

// splice has two responsibilities:
// - inserting
// - deleting
console.log("SPLICE - INSERT (no replace)")
arr.push(1, 2);
// splice(indexToInsertAt, numOfItemsToDelete, itemToInsert...)
arr.splice(0, 0, 3); // insert 3 at start of the array
console.log(`Array should have 3 at the start: [${arr}]`);

console.log("SPLICE - DELETE");
// splice(startIndex, numOfItemsToDelete)
arr.splice(0, 2);
// the index of the last item of the array to be deleted would be startIndex + (numOfItemsToDelete - 1)
console.log(`Array should have 1 item left, the number 2: [${arr}]`);
// remove last item to prep for slice
arr.pop();

// slice
arr.push(1,2,3,4,5);
console.log("SLICE");
// get everything from the 4th element onwards
console.log(arr.slice(3, 5)); // [4,5]
console.log(arr.slice(-2)); // [4,5]
console.log(arr.slice(3)); // [4,5]
console.log(arr.slice(3, -1)) // [4]

// functional programming part of the API:
// - filter, find, findIndex, map, forEach

// filters returns an array of items that match a given predicate
// - test applied to something that returns true or false
// standard structure: (element) -> doSomethingThatReturnsABoolean(element);
console.log("FILTER - EVEN NUMS");
console.log(arr.filter(element => element % 2 == 0));

// find returns the first element that matches a given predicate
console.log("FIND - find the first encounter of number 4");
console.log(arr.find(element => element == 4));

// findIndex returns the index of the first element that matches a given predicate
console.log("FIND - find the index of the first encounter of number 4");
console.log(arr.findIndex(element => element == 4));

// map applies a transformation function that will change the representation of data
// - this could be keeping the elements the same data type, such as numbers remaining as numbers
// - it could be changing the types of the elements instead
// structure of the transformation function: (element) -> transform(element);
console.log("MAP - double the numbers");
console.log(`ORIGINAL: ${arr}`);
console.log(`DOUBLED: ${arr.map(element => element * 2)}`);

console.log("MAP - convert the numbers to strings");
console.log(`As strings: ${arr.map(element => numToString(element))}`);

function numToString(num) {
    switch (num) {
    case 0: return "zero";
    case 1: return "one";
    case 2: return "two";
    case 3: return "three";
    case 4: return "four";
    case 5: return "five";
    }
}

// reduce() reduces an array to a single value
console.log("REDUCE: find sum");
// reduce(reducerFunction, initialValue)
// - 'left' is the accumulator
// - on the first iteration, 'left' is set to the initial value 0 here
// - on each iteration, the current item in the array is put in the 'right' variable
console.log(arr.reduce((left, right) => left + right, 0)); // 15

// Example types built using arrays
// === STACK
// - LIFO - Last item In is the First item Out
function Stack() {
    this.stack = Array();

    this.push = (element) => this.stack.push(element);
    this.pop = () => this.stack.pop();
    this.toString = () => `[${this.stack.toString()}]`;
}

// const myStack = new Stack(2);
// myStack.push(10);
// myStack.push(5);
// console.log(myStack.toString());

// === Queue
// - FIFO - First item in is the First item Out
function Queue() {
    this.queue = Array();

    // add to back of queue
    this.enqeue = (element) => this.stack.push(element);

    // remove from front of queue
    this.dequeue = () => this.stack.shift();
}
