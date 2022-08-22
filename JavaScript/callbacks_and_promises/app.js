console.log("Callbacks and promises");

// Promises
// - part of asynchronous programming
// - a promise may or may not return a value
//    - more specifically, a promise may resolve to a value
//      or reject as an error
// - a promise represents some work that is ongoing that we 
//   desire a result for
// - we can then issue callback functions to execute
//   once the promise has resolved or rejected

// when we create a promise, it always has two parameters
// to a callback that we give it
// - functions will be automatically passed to them
// - resolve() is used to say the function has resolved
//   to a value successfully
// - reject() is used to indicate the promise failed
// - when the promise is neither resolved or rejected,
//   it is pending
let databaseConnection = new Promise((resolve, reject) => {
    let x = 10;

    // emulate network communication
    // - i.e., add a timeout to emulate it
    setTimeout(() => {
        if (x) resolve("Db connection");
        else reject("connection failed");
    }, 5000); // 5000ms = 5seconds
});

// .then   handles succesful resolution of a promise
// .catch  handles a rejected promise
databaseConnection.then(data => {
    // .then will only run when the promise has
    // resolved (if it resolves)
    // - data is whatever the promise resolved to
    //   and is automatically passed to our callback function
    console.log("Promise resolved successfully");
    console.log(data);
}).catch(error => {
    console.error(error);
});

console.log("Hello world");

// =================== async and await ======================
// - async and await are syntactic sugar for promises
function getDatabaseConnection() {
    return new Promise((resolve, reject) => {
        let x = 0;
    
        // emulate network communication
        // - i.e., add a timeout to emulate it
        setTimeout(() => {
            if (x) resolve("Db connection");
            else reject("connection failed");
        }, 6000); // 5000ms = 5seconds
    });
}

async function main() {
    console.log("MAIN executing");
    // await is used to signify that we don't want this
    // function to continue executing until this promise
    // has resolved
    // - a function that uses await must be marked as async
    try {
        let connection = await getDatabaseConnection();
        console.log("MAIN promise returned");
        console.log(connection);
    } catch (error) {
        console.error(error);
    }
}
main();