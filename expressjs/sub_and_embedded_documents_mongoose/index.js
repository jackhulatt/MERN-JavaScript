const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { default: mongoose } = require('mongoose');
const User = require('./model/User');
const authenticationRouter = require('./route/AuthenticationRouter');
const postRouter = require('./route/PostRouter');
const PostNotFoundError = require('./error/PostNotFoundError');

const app = express();
global.__basedir = __dirname;

// Configure sessions to be used (using in-memory store, not for production)
app.use(expressSession({
    secret: "joiahjiufuioahefua", // used for encrypting the cookie, do not store in code and do not make publicly available
    resave: false,
    saveUninitialized: false, // only want sessions upon logging in
    cookie: {
        maxAge: 1 * 60 * 1000 // 1 hour cookie
    }
}));

// Passport configuration (authentication)
// - when logged in, the users id is stored in request.session.passport.user on each request
// - to make it easier to identify that a user is authenticated, we can use special methods provided by passport and passport-local-mongoose
//   to automatically find the user in the db from the id and put them on the request object as request.user
passport.serializeUser(User.serializeUser()); // User.serialize... and User.deserialize.... both come from passport-local-mongoose
passport.deserializeUser(User.deserializeUser());

// provide an authentication strategy to Passport
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate() comes from passport-local-mongoose

/*
    A LocalStrategy(cb) accepts a callback of the form:

    (username, password, done) => { 
        // find user in database
        const user = User.find({ "username": username });
        // compare passwords
        // if passwords are the same: authenticate user
        // else redirect back to login page
    }
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialise passport and indicate it should use sessions for logins
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticationRouter);
app.use('/post', postRouter);

app.use(express.static("public"));

app.use((error, request, response, next) => {
    console.error(error);
    let data = {
        status: 500
    };

    if (error.name === "PostNotFoundError") {
        data = {
            type: error.name,
            status: 404
        }
    } else if (error.name === "ValidationError"
               || error.name === "UserExistsError") {
        data = {
            type: error.name,
            status: 400
        }
    }

    return response.status(data.status).json({
        message: error.message,
        data
    });
});

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/subdoc_example");

        app.listen(3000, () => console.log(`Server upon on port ${3000}`));
    } catch (error) {
        console.error(error);
    }
}

main();