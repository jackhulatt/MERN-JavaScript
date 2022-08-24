// NodeJS
// - its a runtime environment for JavaScript
console.log("Hello world");

// Format strings
const username = "Fred";

// %s signifies a string will be inserted
console.log("Hello %s", username);

// %d signifies a number will be inserted
console.log("The number %d was inserted.", 10);

console.log(`Hello ${username}`);

// logging objects
// - they are printed nicely in the console
const user = {
    name: "Fred",
    age: 55,
    address: {
        no: 55,
        street: "barkers"
    }
};

console.log(user);

// print stack traces
function foo() {
    console.log("foo");
    bar();
}

function bar() {
    console.log("bar");
    other();
}

function other() {
    console.trace(); // prints the stack trace
}
foo();


// coloured console output using ANSI escape sequences
const PREFIX = '\x1b'; // prefixed to ansi escape sequences
const RESET = PREFIX + "[0m"; // resets back to defaults

// Foregrounds
const FG_BLACK = PREFIX + "[30m";
const FG_RED = PREFIX + "[31m";
const FG_GREEN = PREFIX + "[32m";
const FG_YELLOW = PREFIX + "[33m";
const FG_BLUE = PREFIX + "[34m";
const FG_MAGENTA = PREFIX + "[35m";
const FG_CYAN = PREFIX + "[36m";
const FG_WHITE = PREFIX + "[37m";

// Backgrounds
const BG_BLACK = PREFIX + "[40m";
const BG_RED = PREFIX + "[41m";
const BG_GREEN = PREFIX + "[42m";
const BG_YELLOW = PREFIX + "[43m";
const BG_BLUE = PREFIX + "[44m";
const BG_MAGENTA = PREFIX + "[45m";
const BG_CYAN = PREFIX + "[46m";
const BG_WHITE = PREFIX + "[47m";

console.log(`Hello ${BG_WHITE}${FG_GREEN}world${RESET}.`);