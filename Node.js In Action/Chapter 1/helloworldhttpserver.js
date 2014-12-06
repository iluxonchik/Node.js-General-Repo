var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('Hello World\n');
  // console log the clients http version
  // NOTE: the console log below is siplayed twice when accessing the server
  // bevcause the browser also requests the favicon.ico
  console.log('Clients http version: ' + req.httpVersion);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
