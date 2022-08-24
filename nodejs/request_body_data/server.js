const http = require("http");
const URL = require('url');
const fs = require('fs').promises;

const HOST = "localhost"; // 127.0.0.1 is also valid (local loopback address), it's a special reserved IPv4 address
const PORT = 3000;

function requestHandler(request, response) {
  const url = URL.parse(request.url, true);

  console.log(url.pathname);
  switch (url.pathname) {
    case "/":
      serve(request, response, "index.html");
      break;
    case "/body":
      body(request, response);
      break;
    default:
      // check for static file
      fs.stat(__dirname + `/static/${url.pathname}`)
        .then(stats => {
          console.log("file was found");
          serve(request, response, url.pathname);
        }).catch(error => {
          console.error("file not found")
          notFound(request, response);
        });
  }
}

function body(request, response) {
  let data = '';

  // request.on() listens for an emitted event
  // - an IncomingMessage object, just like a Server object, can emit events
  request.on('data', chunk => {
    data += chunk;
  });

  /*
    Modify the response so that if the body data contains a property `name`, and the value is not null or an 
    empty string, it returns a secret greeting otherwise it should return the response it normally returns.
  */
  request.on('end', () => {
    data = JSON.parse(data);
    console.log(data);
    response.setHeader('Content-type', 'application/json');
    response.end(JSON.stringify(data));
  });
}

function serve(request, response, file) {
  // __dirname is a global variable set to the absolute path which represents
  // the root directory of your project, i.e., where you        r apps entry point is
  fs.readFile(__dirname + `/static/${file}`)
    .then(data => { // data is the contents of the file, of type Buffer, this just contains the characters of the document
      response.statusCode = 200;
      response.setHeader('Content-type', 'text/html');
      response.end(data); // put data in the body
    }).catch(error => { // if we didn't find the file, its an error
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