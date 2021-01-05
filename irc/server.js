var fs   = require('fs');
var http = require('http').createServer(function (req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    }
  );
});
var io   = require('socket.io')(http);

http.listen(80);

io.on('connection', function (socket) {
  socket.emit('welcome', { message: 'Vous êtes connecté au chat !' });
  socket.on('message', function (data) {
    console.log('Message: ' + data);
    socket.broadcast.emit('message', {message: data});
  });
});