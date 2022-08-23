// Functional programming
// - closures
// - higher order functions (HOF)
// - pure function

// Higher order function
// - returns a function or
// - accepts a function as parameter or
// - a combination of both

/**
 * Returns an array containing only elements which match the given
 * predicate function.
 * @param {*} arr 
 * @param {*} f 
 */
function filter(arr, f) {
    const newArr = [];

    for (const element of arr) {
        if (f(element)) newArr.push(element);
    }
    return newArr;
}

console.log(filter([1,2,3,4], (element) => element % 2 == 0));

/* Closure
   - is made using a HOF
   - a closure retains the environment in which it was declared
*/
function counter() {
    // this variable will be the counter for each
    // closure produced
    let i = 0;

    // a closure is a function returned from a function
    // which retains access to variables defined in the scope
    // that the returned function was defined in
    return () => ++i;
}

// count and count2 are closures, functions that 
// we can keep calling
// - both count and count2 have unique environments, they 
//   have their own copy of i that they refer to
const count = counter();
const count2 = counter();

for (let i = 0; i < 10; i++) {
    console.log(count());
}

for (let i = 0; i < 10; i++) {
    console.log(count2());
}

// Currying
// - concept introduced by Haskell Curry
// - the ability to call functions multiple times in a row,
//   but the function called is not the same function, it is returned
//   from the function
console.log("=== CURRYING ===");
console.log(counter()()); // 1
console.log(counter()); // () => ++i

function counterWithoutAccessUntilLimitValue(limit) {
    let i = 0;

    function increment() {
        if (i < limit) {
            i++;
            return increment;
        } else {
            return i;
        }
    }

    return increment;
}

const curriedCounter = counterWithoutAccessUntilLimitValue(5);
console.log(curriedCounter()()()()()());

// Pure functions
// - a pure function is a function which does not have side affects
// - a call to a pure function can be replaced with its result
//   without affecting the program code
// - a pure function, given the same inputs, will always evaluate
//   to the same value
// Side effects:
// - modifying global state
//   (basically, modifying anything outside of the function itself)
// - network io
// - file io
let add = (a,b) => a + b;
let multiply = (a,b) => a*b;
add(10, 20);

// filter is pure
function filter(arr, f) {
    if (!Array.prototype.isPrototypeOf(arr)) throw new Error("Can only filter arrays");
    if (typeof(f) != "function") throw new Error("Invalid function supplied.");

    const newArr = [];

    for (const element of arr) {
        if (f(element)) newArr.push(element);
    }
    return newArr;
}

filter([1,2], (element) => element % 2 == 1);
// [1]