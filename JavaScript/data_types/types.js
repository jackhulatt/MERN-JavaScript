// JavaScript types
// - everything is an object
// - JavaScript implements the prototype pattern,
//   which is also how it enables object-oriented
//   programming

// number
// - this covers integers and real numbers (floating point)
let x = 5;

// bigint
// - really big integers beyond the standard storage
//   capacity

// string
// - alphanumeric characters within quotes
let aStr = "Hello world";

// boolean
// - true or false
let aBool = true;
aBool = "Hello"; // dynamically typed

// null
// - represents a value that a variable can have

// undefined
// - is a value of a variable that has been declared
//   but not initialised

// symbol
// - unique key fields for objects

// object
// - objects are easy to create
// - key:value pairs within curly braces
// - key doesn't need to be a string
const person = {
  name: "Bob",
  age: 34,
  toString: function() {
    return `${this.name} is ${this.age}`;
  }
};

// access the value of a field using dot notation
console.log(person.toString());
console.log(person.name);

// to indicate a field in an object that should only
// be used internally, prefix it with an underscore:
// - all it does is indicate to the user of the object
//   that they shouldn't use that variable or function
// - just a convention
const anotherPerson = {
    _name: "Bob",
    getName: function() { return this._name }
}

console.log(anotherPerson.getName());

