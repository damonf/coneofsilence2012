
exports.index = function(req, res) {
  res.render('index', { title: 'Cone of Silence' });
};

exports.encode = function(req, res) {
  var text = req.body.secretText;
  var key = req.body.secretKey;

  var crypto = require('crypto');

  var plaintext = new Buffer(text);
  var encrypted = "";
  var cipher = crypto.createCipher('aes256', key);
  encrypted += cipher.update(plaintext, 'binary', 'base64');
  encrypted += cipher.final('base64');

  res.send(encrypted);
};

exports.decode = function(req, res) {
  var text = req.body.secretText;
  var key = req.body.secretKey;

  var crypto = require('crypto');

  var decrypted = "";
  var decipher = crypto.createDecipher('aes256', key);
  decrypted += decipher.update(text, 'base64', 'binary');
  decrypted += decipher.final('binary');

  var output = new Buffer(decrypted); 

  res.send(decrypted);
};

