console.log("Conditionals\n");

// Truthy and falsey concept:
// - everything has a truth value
// - if put in a conditional expression, it evaluates
//   to true or false

// Falsey values:
// - false
// - 0
// - '', "" or ``
// - undefined
// - null
// - NaN
let falseValue = false;
let anotherFalse = 0;

if (anotherFalse == true) {
    console.log("0 is true");
}

// Everything else is a truthy value.
let aTrueValue = 1;

if (aTrueValue == true) {
    console.log("1 is true");
}

if ({}) {
    console.log("{} (empty object) is true");
}

// Operators
// - precedence and associativity
// - precedence the priority of an operator
// - associativity dictates the order expressions are 
//   evaluated in given the same precedence level
let expression1 = 1 < 2 < 3; 
// ((1 < 2) < 3)
// (true < 3)
// true

let expression2 = 3 > 2 > 1;
// ((3 > 2) > 1)
// ((true) > 1)
// (false)

console.log(expression1);
console.log(expression2);

// if statements
if (5) {
    // do this
    console.log("5 is true");
} else if (true) {
    console.log("done elseif");
} else {
    console.log("done else");
}

// ternary expression
let numIsEven = 11 % 2 == 0 ? "was true" : "was false";
console.log(numIsEven);

// Strict vs loose equality

// Loose equality (==):
// - checks if two values are equal
// - doesn't care about type
// - it will try to convert the values to a common type
// - 3 == "3" will be converted to "3" == "3"
console.log(3 == "3"); // true

// Strict equality (===):
// - Cares about the type
console.log(3 === 3); // true
console.log(3 === "3"); // false

console.log(null == undefined); // true
// loose equality converts null == undefined
// to false == false

// Short-circuit logical operators
// || for OR
// && for AND
// - short-circuit behaviour is the same as Java
// - the difference between Java and JavaScript logical
//   operations is that JS logical operations return 
//   whichever operand was true (specifically, what 
//   the operand evaluates to)
console.log(5 || null); // 5
console.log(null || 5); // 5

console.log(undefined || null); // null
console.log(null || undefined); // undefined

console.log(5 && null); // null
console.log(null && 5); // null

console.log(undefined && null); // undefined