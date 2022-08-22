// Three ways to declare variables:
// - var (avoid this like the plague)
// - let
// - const
console.log(x); // undefined
var x = 55; // x was hoisted

// Hoisting
// - happens when the var keyword is used to declare a 
//   variable
// - it lifts the variable declaration (not initialisation)
//   to the nearest enclosing global or function scope
// - scope defines where the variable is accessible

// Lexical scoping:
// - We can see the scope of a variable from looking 
//   at the source code, i.e., the curly braces 
//   that define a block define a scope.

// functions are also hoisted to the top of their
// enclosing scope
doSomething();
function doSomething() {
    console.log("Doing something");
}

// let and const share the same scoping rules:
// - locally scoped to the nearest enclosing block
//   , i.e., the block in which they are declared
let y = 20;
const z = 100;
console.log("In global scope: " + y);

function some() {
    // this y is in a local scope
    // - y is said to be shadowing the y declared in 
    //   the global scope
    let y = 30;
    console.log("In local scope: " + y);
}
some();
// String surrounded in backticks:
// - Template literals can have values inserted
// - insert values using ${}
//   - these values must be an expression, whether that is a literal value or something else
let traditionalString = "Hello world";
let stringInSingleQuotes = 'Hello world';
let templateLiteralString = `${x} + ${y} = ${x + y}`;
console.log(templateLiteralString);

// cannot redeclare a variable declared with let
// in the same scope
// - same rule applies to const
// let y = 50; // identifier 'y' already declared

// cannot reassign the value of a variable declared
// with const
// z = 160;