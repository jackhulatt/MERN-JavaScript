const { info } = require("console");
const http = require("http");
const URL = require('url');

const HOST = "localhost"; // 127.0.0.1 is also valid (local loopback address), it's a special reserved IPv4 address
const PORT = 3000;

const server = http.createServer(requestHandler);

function requestHandler(request, response) {
  const url = URL.parse(request.url, true);

  switch (url.pathname) {
    case "/":
      home(request, response);
      break;
    case "/info":
        infoPage(request, response);
        break;
    default:
      notFound(request, response);
      break;
  }
}

function infoPage(request, response) {
    const url = URL.parse(request.url, true);

    const country = url.query.country;
    
    response.statusCode = 200;
    
    // set any necessary headers
    response.setHeader("Content-type", "text/html");

    // write some data to the response body
    response.write("<html>");
    response.write("<head><title>Site | Home</title></head>");
    response.write(`<body><p>The country is ${country}</p></body>`);
    response.write("</html>");
    response.end();
}

function home(request, response) {
    // set status code
    response.statusCode = 200;

    // set any necessary headers
    response.setHeader("Content-type", "text/html");

    // write some data to the response body
    response.write("<html>");
    response.write("<head><title>Site | Home</title></head>");
    response.write("<body><h1>Home</h1></body>");
    response.write("</html>");

    // then send the response back to the browser to prevent a timeout from occuring
    response.end();
}

function notFound(request, response) {
  response.statusCode = 404;
  
  // response.setHeader("Content-type", "text/plain");
  // response.write(`${request.url} was not found for method ${request.method}`);
  // or
  response.setHeader("Content-type", "text/html");
  response.write("<html>");
  response.write("<head><title>404 - Not found</title></head>");
  response.write("<body><h1>404 - Not found...</h1></body>");
  response.write("</html>");

  response.end();
}

// start the server by calling .listen() and passing a port, host address and callback to run when the server starts
server.listen(PORT, HOST, () => console.log(`Server up on ${HOST}:${PORT}`));