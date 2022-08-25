const express = require('express');
const User = require('../model/User');

const router = express.Router();

let idCounter = 1;
const usersDatabase = [new User(idCounter++, "Bob123", "password", "bob@mail.com")];

function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}

// Once we have an instance of router, it works very similar to how we add
// routes and middleware to the app itself, i.e., from const app = express()
router.get("/user", (request, response) => {
    console.log("In get user");
    response.json(usersDatabase);
});

// read by id
// in the path, a colon followed by a name consisting of letters, numbers and 
// underscores will be treated as a path variable
router.get("/user/:id", (request, response, next) => {
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

router.post("/user", isJsonData, (request, response) => {
    const data = request.body;
    const user = new User(idCounter++, data.username, data.password, data.email);
    usersDatabase.push(user);
    response.status(201)
            .setHeader("Content-Location", `/user/${user.id}`)
            .json(user); // auto sets the Content-Type header to 'application/json; charset=utf-8'
});

// update
router.put("/user/:id", isJsonData, (request, response) => {
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
router.delete("/user/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const userIndex = usersDatabase.findIndex(user => user.id === id);

    if (userIndex === -1) return next(new UserNotFoundError(id));

    usersDatabase.splice(userIndex, 1);

    response.sendStatus(200);
});

module.exports = router;