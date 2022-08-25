const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    response.send("Hello world");
});

app.get("/get/:id", (request, response) => {
    const id = parseInt(request.params.id);

    // parseInt returns NaN if it wasn't a number
    // - to check for NaN, use the global isNaN() function
    // const isIt = isNaN(id);
    console.log(id);
    response.status(200)
            .end();
});

const myObj = {
    username: "Bob",
    age: 32
}

app.get("/json", (request, response) => {
    response.status(200)
            .json(myObj);
});

app.post("/", (request, response) => {
    const data = request.body;
    console.log(data);
    response.status(200)
            .end();
});

const server = app.listen(port, () => console.log(`Server up on port ${port}`));