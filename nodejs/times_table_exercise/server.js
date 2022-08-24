const http = require("http");
const URL = require('url');

const HOST = "localhost"; // 127.0.0.1 is also valid (local loopback address), it's a special reserved IPv4 address
const PORT = 3000;

function requestHandler(request, response) {
  const url = URL.parse(request.url, true);

  switch (url.pathname) {
    case "/":
      home(request, response);
      break;
    case "/table":
        table(request, response);
        break;
    default:
      notFound(request, response);
      break;
  }
}

function table(request, response) {
    const url = URL.parse(request.url, true);
    const table = url.query.table || 1;
    const range = url.query.range || 12;
    
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");

    response.write("<html>");
    response.write("<head><title>Site | Tables</title></head>");
    response.write(`<body><h1>${table} times tables</h1><ul>`);
    
    for (let i = 1; i <= range; i++) {
      console.log(table * i);
      response.write(`<li>${table} * ${i} = ${table * i}</li>`);
    }

    response.write("</ul></body>")
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

const server = http.createServer(requestHandler);
// start the server by calling .listen() and passing a port, host address and callback to run when the server starts
server.listen(PORT, HOST, () => console.log(`Server up on ${HOST}:${PORT}`));