/* Using the filesystem module to load resourse.json from the disc */
var fs = require('fs');
fs.readFile('./resourse.json', function(er, data) {
  console.log(data);
})
