var fs = require('fs');
var stream = fs.createReadStream('./resourse.json');
stream.on('data', function (chunk) {
	console.log(chunk);
})

stream.on('end', function (argument) {
	console.log('finished');
})

console.log('Async!');