const http = require("http");
const URL = require('url');
const fs = require('fs').promises;

const HOST = "localhost"; // 127.0.0.1 is also valid (local loopback address), it's a special reserved IPv4 address
const PORT = 3000;

function requestHandler(request, response) {
  const url = URL.parse(request.url, true);

  switch (url.pathname) {
    case "/":
      serve(request, response, "index.html");
      break;
    default:
      notFound(request, response);
      break;
  }
}

function serve(request, response, file) {
  fs.readFile(__dirname + `/static/${file}`)
    .then(data => {
      response.statusCode = 200;
      response.setHeader('Content-type', 'text/html');
      response.end(data);
    }).catch(error => {
      console.error(error);
      notFound(request, response);
    });
}

function notFound(request, response) {
  response.statusCode = 404;
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