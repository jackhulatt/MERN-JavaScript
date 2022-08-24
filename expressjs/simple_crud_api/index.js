const express = require('express'); 
const User = require('./model/User');
const UserNotFoundError = require('./error/UserNotFoundError');

const PORT = process.env.PORT || 3000;
const app = express();

let idCounter = 1;
const usersDatabase = [];

// setup middleware for parsing JSON and formdata
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup serving static files
app.use(express.static("public"));

app.get("/user", (request, response) => response.json(usersDatabase));

// read by id
// in the path, a colon followed by a name consisting of letters, numbers and 
// underscores will be treated as a path variable
app.get("/user/:id", (request, response, next) => {
    const user = usersDatabase.find(u => u.id == request.params.id);

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

app.post("/user", (request, response) => {
    const data = request.body;
    const user = new User(idCounter++, data.username, data.password, data.email);
    usersDatabase.push(user);
    response.status(201)
            .json(user);
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