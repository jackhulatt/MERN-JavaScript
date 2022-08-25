// Rest params and spread operator introduced in ES6 (EcmaScript 2015 specification)

// Rest parameter
// - must be the final parameter
// - variable num of args
function add(...nums) {
    return nums.reduce((left, right) => left + right, 0);
}

const result = add(10, 10, 10, 10, 10);
console.log(result);

// Spread operator
const arr = [1,2,3,4,5];
const arr2 = [6,7,8,9,10];

// spread operator is used before an array to spread its
// contents out into another array
const arr3 = [...arr, ...arr2];

console.log(arr3);

console.log(add(...arr3));