const express = require('express');
const UserNotFoundError = require('../error/UserNotFoundError');
const User = require('../model/User');

const router = express.Router();

function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}

// Once we have an instance of router, it works very similar to how we add
// routes and middleware to the app itself, i.e., from const app = express()
router.get("/", async (request, response) => {
    // User.find() will pull all users back from the database
    // - User.find() returns a promise, we need to await the result
    response.json(await User.find());

    // Finding with filters
    // SELECT * FROM user WHERE createdAt = "2022-08-01" AND age < 65;
    // User.find({
    //     createdAt: "2022-08-01",
    //     age: {
    //         "lt": 65
    //     }
    // })
});

// read by id
// in the path, a colon followed by a name consisting of letters, numbers and 
// underscores will be treated as a path variable
router.get("/:id", async (request, response, next) => {
    const user = await User.findById(request.params.id);

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

router.post("/", isJsonData, async (request, response, next) => {
    try {
        const user = new User(request.body);
        await user.save();

        response.status(201)
                .setHeader("Content-Location", `/user/${user.id}`)
                .json(user); // auto sets the Content-Type header to 'application/json; charset=utf-8'
    } catch (error) {
        next(error);
    }
});

// update
router.put("/:id", isJsonData, async (request, response, next) => {
    const user = await User.updateOne({ _id: request.params.id }, request.body);

    if (user) {
        response.status(200)
            .json(user);
    } else {
        next(new UserNotFoundError(request.params.id));
    }
});

// delete
router.delete("/:id", async (request, response, next) => {
    const user = await User.findOneAndDelete({ _id: request.params.id });

    if (user) {
        response.status(200).json(user);
    } else {
        next(new UserNotFoundError(request.params.id));
    }
});

module.exports = router;