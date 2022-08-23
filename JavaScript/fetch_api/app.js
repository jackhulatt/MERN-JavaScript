const getBtn = document.querySelector("#get");
const postBtn = document.querySelector("#post");
const putBtn = document.querySelector("#put");
const deleteBtn = document.querySelector("#delete");

// AJAX
// - Asynchronous JavaScript and XML
// - its a term describing network communication between a web
//   app and some web resources
// - traditionally, this was done with XMLHttpRequests
// - the Fetch API is the modern replacement, introduced in ES6
//   (EcmaScript 2015) that also supports promises

// Fetch API
// - used for network communication

// GET request
getBtn.addEventListener("click", (event) => {
    // we use the fetch function for that
    // fetch(url, options)
    // - the options are optional but ideally are included

    // fetch() returns a promise
    fetch('https://jsonplaceholder.typicode.com/todos', {
        // this object contains the options for the request
        method: "GET",
        headers: {
            // only accept JSON responses
            "Accept": "application/json; charset=UTF-8"
        }
    }).then(response => {
        // first .then() gets the HTTP response
        // check if the response is ok, within the 200-299 range
        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
        return response.json(); // converts the JSON body to a JS object
    }).then(data => {
        // data is whatever response.json() returned
        console.log(data);

        // iterating over data
        // - adding each item to the DOM
    }).catch(error => {
        console.log(error.message);
    });
});

// POST request
postBtn.addEventListener("click", async (event) => {
    try {
        const todo = {
            completed: false,
            title: "Testing",
            userId: 1
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            // this object contains the options for the request
            method: "POST",
            headers: {
                // only accept JSON responses
                "Accept": "application/json; charset=UTF-8",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(todo) // convert todo to json
        });
        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
});

// PUT request
putBtn.addEventListener("click", async (event) => {
    try {
        const todo = {
            completed: true,
            title: "quis ut nam facilis et officia qui",
            userId: 1,
            id: 2
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/todos/2', {
            // this object contains the options for the request
            method: "PUT",
            headers: {
                // only accept JSON responses
                "Accept": "application/json; charset=UTF-8",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(todo) // convert todo to json
        });
        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
});

// DELETE request
deleteBtn.addEventListener("click", (event) => {
    fetch('https://jsonplaceholder.typicode.com/todos/243', {
        // this object contains the options for the request
        method: "DELETE",
        headers: {
            // only accept JSON responses
            "Accept": "application/json; charset=UTF-8"
        }
    }).then(response => {
        // first .then() gets the HTTP response
        // check if the response is ok, within the 200-299 range
        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
        console.log(response);
    }).catch(error => {
        console.log(error.message);
    });
});