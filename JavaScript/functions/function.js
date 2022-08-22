console.log("Functions");

// Different type:
// - arrow functions
// - standard function declarations

// These could be:
// - named functions (function declarations only)
// - anonymous functions

// An arrow function is what is called a
// function expression.

// Functions are first class members in JavaScript, 
// as a function is just an object it can be treated 
// like any other value and assigned to a variable, passed 
// to a function as arguments, etc...

// named function declaration
function namedFunction() {
    console.log("Named function was called");
}
namedFunction();

// named function with inputs
// - we don't need to specify the parameter types
function namedFunctionWithInputs(x, y, z) {
    console.log(`Named function with input was called with: ${x} ${y} ${z}`);
}
// we don't actually need to specify all inputs
// - it doesn't cause an error
namedFunctionWithInputs();
namedFunctionWithInputs(10); // x, y
namedFunctionWithInputs(10, 20, 30); // x, y, z

// anonymous functions
// - a function without a name
// - it is a function expression, the declaration
//   returns a function which can be assigned to a variable
let isEven = function(num) {
    return num % 2 == 0;
};
console.log("3 is even: " + isEven(3));

// arrow function expressions
// - concise syntax similar to Lambdas in Java
// - uses a fat arrow instead to separate the parameters
//   and the body
isEven = (num) => num % 2 == 0;
// - single parameter, num
// - the body is after the arrow
// - as the body has no block, it implicitly returns
//   the result of the expression

// If a arrow function has only one parameter, and only
// one, the parenthesis are optional:
isEven = num => num % 2 == 0;

// If a block body is specified, the return keyword
// must be specified if a return value is desired
isEven = num => {
    return num % 2 == 0;
};
