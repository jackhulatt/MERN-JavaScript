const express = require('express'); 
const morgan = require('morgan');
const User = require('./model/User');
const UserNotFoundError = require('./error/UserNotFoundError');

const PORT = process.env.PORT || 3000;
const app = express();

let idCounter = 1;
const usersDatabase = [new User(idCounter++, "Bob123", "password", "bob@mail.com")];

// middleware is just a function that accepts, potentially, two, three or four parameters:
// - function(request, response)
// - function(request, response, next)
// - function(error, request, response, next)
// `next` refers to the next piece of middleware in the stack, it is a function that you can call
// - the request and response objects are automatically passed
function simpleLogger(request, response, next) {
    console.log(`${request.method} - ${request.url}`);
    next(); // call next piece of middleware in the stack
}

// apply the middleware, the simple logger, to everything after it in the middleware stack with app.use()
app.use(simpleLogger); // we are not calling the function, we are passing it as an argument as it is the middleware

app.use(morgan('combined'));

// setup middleware for parsing JSON and formdata
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup serving static files
app.use(express.static("public"));

function logHitSpecialEndpoint(request, response, next) {
    console.log("Hit /special endpoint");
    next();
}

// we can apply middleware that is only used on certain routes
app.get("/special", logHitSpecialEndpoint, (request, response, next) => {
    console.log("Now in /special handler");
    next();
}, (request, response) => {
    response.send("Done with the /special route now");
});

app.get("/user", (request, response) => {
    console.log("In get user");
    response.json(usersDatabase);
});

// read by id
// in the path, a colon followed by a name consisting of letters, numbers and 
// underscores will be treated as a path variable
app.get("/user/:id", (request, response, next) => {
    const user = usersDatabase.find(u => u.id === parseInt(request.params.id));

    if (user) {
        response.status(200).json(user);
    } else {
        // next can be used to call a piece of middleware (a function)
        // to perform some task
        // - it is the next handler in a chain of handlers
        // if passed an error, it will call error handling middleware
        next(new UserNotFoundError(request.params.id));
    }
});

function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}

app.post("/user", isJsonData, (request, response) => {
    const data = request.body;
    const user = new User(idCounter++, data.username, data.password, data.email);
    usersDatabase.push(user);
    response.status(201)
            .setHeader("Content-Location", `/user/${user.id}`)
            .json(user); // auto sets the Content-Type header to 'application/json; charset=utf-8'
});

// update
app.put("/user/:id", isJsonData, (request, response) => {
    // implement me
    const id = parseInt(request.params.id);
    const data = request.body;
    const userIndex = usersDatabase.findIndex(u => u.id === id);

    if (userIndex === -1) return next(new UserNotFoundError(id));
    const priorState = usersDatabase[userIndex];
    usersDatabase[userIndex] = new User(id, data.username || priorState.username, 
                                        data.password || priorState.password, 
                                        data.email || priorState.email);
    // const user = new User(id, data.username || priorState.username, 
    //                       data.password || priorState.password, 
    //                       data.email || priorState.email);
    // usersDatabase.splice(userIndex, 1, user);
    response.status(200)
            .json(usersDatabase[userIndex]);
});

// delete
app.delete("/user/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const userIndex = usersDatabase.findIndex(user => user.id === id);

    if (userIndex === -1) return next(new UserNotFoundError(id));

    usersDatabase.splice(userIndex, 1);

    response.sendStatus(200);
});

// error handlers are middleware, they are at the end of the middleware
// chain in Express
// - they always have an extra first parameter, the error
app.use((error, request, response, next) => {
    console.error(error.message);
    let responseCode = 500;

    if (error instanceof UserNotFoundError) {
        responseCode = 404;
    }
    
    return response.status(responseCode).json({
        message: error.message
    });
});

const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));