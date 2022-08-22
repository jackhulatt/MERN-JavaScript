console.log("\nOBJECTS\n");

// Easiest way to build an object is dynamically using
// the literal syntax:
let myObj = {
    name: "Fred"
};

// Function constructors
// - a function is also just an object in JS
function Person(name, age) {

    // this uses the expando property of objects
    // to automatically add a new property called
    // name and assign it the passed in value
    this.name = name;
    this.age = age || -1;
}

myObj = new Person("Fred", 55);
console.log(myObj);

// class syntax
// - syntactic sugar over the prototype system
class PersonAlt {

    _name;
    _age;

    // keyword 'constructor' is used for 
    // declaring a constructor for a class
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    // get and set methods
    get name() {
        return this._name;
    }

    set name(name) {
       this._name = name;
    }
}

myObj = new PersonAlt("Bob", 20);
console.log(myObj.name); // call the getter without any params
myObj.name = "Fred"; // call setter using the assignment operator
console.log(myObj.name); 