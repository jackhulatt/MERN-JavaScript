// class syntax is a syntactic sugar over prototypes
// - makes the code easier to read
// - it doesn't introduce new functionality, it makes existing functionality easier to use

// classes don't have access modifiers
// a class starts with the class keyword
class User {
    // (private) variables for internal use in a class should be prefixed with an underscore
    // _id;
    //username;

    constructor(username) {
        this.username = username;
    }
    
    // the get and set functions are automatically applied when using dot notation, i.e.,
    // const name = user.username; // calls get username() 
    // user.username = "Fred"; //  calls set username("Fred")
    get username() {
        return this._username;
    }

    set username(username) {
        if ((String.prototype.isPrototypeOf(username) || typeof username === 'string') 
         && username.trim().length != 0) {
            this._username = username;
        } else {
            throw new ValidationError("Validation error");
        }
    }

    // overriding method in parent
    toString() {
        return `User[username=${this.username}]`;
    }

    // overloading isn't supported
}

// Inheritance using classes
// - we use the extends keyword
// - we inherit methods and properties but not constructors
class ValidationError extends Error {

    constructor(message) {
        super(message);
    }
}

try {
    const user = new User("Bob");
    // user.username = "Bob";
    console.log(user.toString());
} catch (error) {
    // if (ValidationError.prototype.isPrototypeOf(error))
    console.error(error.message);
}