var express = require('express'),
    path = require('path'),
    app = express(),
    server, port;

// app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server = app.listen(process.env.PORT || 80, function () {
    port = server.address().port;
    console.log('Listening at port ' + port);
});
