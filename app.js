
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

app.get('/testenc', function(req, res) {
  var crypto = require('crypto');
  var key = 'abc123';

  var plaintext = new Buffer('abcdefghijklmnopqrstuv');
  var encrypted = "";
  var cipher = crypto.createCipher('blowfish', key);
  encrypted += cipher.update(plaintext, 'binary', 'base64');
  encrypted += cipher.final('base64');

  var decrypted = "";
  var decipher = crypto.createDecipher('blowfish', key);
  decrypted += decipher.update(encrypted, 'base64', 'binary');
  decrypted += decipher.final('binary');

  var output = new Buffer(decrypted); 

  res.send('encrypted: ' + encrypted + '  decrypted: ' + decrypted);
});

app.listen(3000);
console.log('server started');
