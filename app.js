#!node

var express = require('express')
  , app = express.createServer()
  , site = require('./site');

app.set('view engine', 'ejs');
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', site.index);
app.post('/encode', site.encode);
app.post('/decode', site.decode);

app.listen(3000);
console.log('server started');

var spawn = require('child_process').spawn;
spawn('open', ['http://localhost:3000/']);

