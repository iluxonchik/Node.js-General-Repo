var http = require('http'); // HTTP client and server functionality
var fs = require('fs'); // filesystem-related functionality
var path = require('path'); // filesystem path-related functionality
var mime = require('mime'); // derive a MIME based on filename extension

var cache = {}

function send404(response) {
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
