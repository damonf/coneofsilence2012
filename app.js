
var express = require('express')
  , app = express.createServer()
  , site = require('./site');

app.set('view engine', 'ejs');
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));

app.get('/', site.index);

app.listen(3000);
console.log('server started');
