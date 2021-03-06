var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');

var handleError = function (err, res) {
  var filePath = extract('/404.html');
  fs.readFile(filePath, function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(404);
    res.end(data);
  });
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      var mimetype = mime.getType(req.url);
      console.log(mimetype);
      res.setHeader('Content-Type', mimetype);
      res.end(data);
    }
  });
});
server.listen(3000);
