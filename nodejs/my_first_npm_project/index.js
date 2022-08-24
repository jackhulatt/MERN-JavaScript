const express = require('express'); 

// process.env is a global object available in NodeJS
const PORT = process.env.PORT || 3000; // looks for environment variable or defaults to 3000 if it isn't present

// app is an Express object
// - we can mount endpoints on the object to listen to
// - we can also supply middleware
const app = express();

// app.METHOD(PATH, CALLBACK)
// - this creates and mounts an endpoint on the Express object
// - method is get, post, put, delete, patch, etc...
// - path is where we want the request to goto
// - callback accepts a function that accepts a request and a response
app.get("/", (request, response) => {
    response.send("Hello world");
});

// start the server up
// - app.listen(PORT, CALLBACK(no params))
// - app.listen returns an instance of http.Server
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));