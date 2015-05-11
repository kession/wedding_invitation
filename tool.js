var crypto = require('crypto');

var username = '张大千先生';
var md5 = crypto.createHash('md5');
afterCrypto = md5.update(username).digest('hex');
console.log('username:' + username + ', crypto: ' + afterCrypto);
