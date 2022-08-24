// http module
// - built into NodeJS
// - ExpressJS is built on top of it
const http = require("http");
// require is a special function for importing modules into the current file

// setup variables for the host address and the port that the web app runs on
const HOST = "localhost"; // 127.0.0.1 is also valid (local loopback address), it's a special reserved IPv4 address
const PORT = 3000;

// create a server instance
// - a server is an instance of EventEmitter

// createServer can accept a callback, it is a handler which accepts a
// request and response object
const server = http.createServer((request, response) => {
    // response is an instance of ServerResponse
    // request is an instance of IncomingMessage

    // How would we return a response containing the 7 times tables upto 10 * 7 in the following format:
    /*
    <ul>
      <li>1 * 7 = 7</li>
      <li>2 * 7 = 14</li>
      <li>etc...</li>
    </ul>
    */

    // set status code
    response.statusCode = 200;

    // set any necessary headers
    response.setHeader("Content-type", "text/html");

    // write some data to the response body
    response.write("<html>");
    response.write("<head><title>My generated HTML</title></head>");
    response.write("<body><h1>Hello world</h1></body>");
    response.write("</html>");

    // then send the response back to the browser to prevent a timeout from occuring
    response.end();
});

// start the server by calling .listen() and passing a port, host address and callback to run when the server starts
server.listen(PORT, HOST, () => console.log(`Server up on ${HOST}:${PORT}`));