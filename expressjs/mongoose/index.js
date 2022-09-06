const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose'); // mongoose can be used for connecting to MongoDB instances
const UserNotFoundError = require('./error/UserNotFoundError');
const userRouter = require('./router/UserRouter');

// destructuring allows us to grab specific properties
// from an object, this is done by putting braces around the
// names of the comma-separated properties that we desire
const { simpleLogger, logHitSpecialEndpoint } = require('./loggers/generic');

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/mongooseExample"
const app = express();

// middleware is just a function that accepts, potentially, two, three or four parameters:
// - function(request, response)
// - function(request, response, next)
// - function(error, request, response, next)
// `next` refers to the next piece of middleware in the stack, it is a function that you can call
// - the request and response objects are automatically passed

// apply the middleware, the simple logger, to everything after it in the middleware stack with app.use()
app.use(simpleLogger); // we are not calling the function, we are passing it as an argument as it is the middleware

app.use(morgan('combined'));

// setup middleware for parsing JSON and formdata
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup serving static files
app.use(express.static("public"));

app.use("/user", userRouter);

// we can apply middleware that is only used on certain routes
app.get("/special", logHitSpecialEndpoint, (request, response, next) => {
    console.log("Now in /special handler");
    next();
}, (request, response) => {
    response.send("Done with the /special route now");
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

let server;
let databaseConnection;

// connect() is used to connect to a mongodb server
mongoose.connect(DB_URL, { useNewUrlParser: true })
        .then(() => {
            console.log(`Database connected`);
            databaseConnection = mongoose.connection;
            server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
        }).catch(error => {
            console.log(`Unable to connect to database.`)
        });

 