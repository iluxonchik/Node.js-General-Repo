var http = require('http'); // HTTP client and server functionality
var fs = require('fs'); // filesystem-related functionality
var path = require('path'); // filesystem path-related functionality
var mime = require('mime'); // derive a MIME based on filename extension
var chatServer = require('./lib/chat_server');

var cache = {}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if(request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
})

// Start Socket.IO server functionality, providing an existing HTTP server,
// so that the same TCP/IP port can be shared
chatServer.listen(server);

function send404(response) {
  // NOTE: that way "404" can be sent to multiple responses
  response.writeHead(404, {'Content-Type' : 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead( 200,
    {'content-type' : mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}


/* Serving Static Files */
function serveStatic(response, cache, absPath) {
  if (cache[absPath]) { // check if the file is cached
    sendFile(response, absPath, cache[absPath]); // serve from em
  } else {
    fs.exists(absPath, function(exists) {
      if(exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data; // cache file
            sendFile(response, absPath, data); // serve file
          }
        });
      } else {
        // File does not exist
        send404(response);
      }
    })
  }
}
