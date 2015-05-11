var crypto = require('crypto');

exports.md5 = function(password) {
    var md5 = crypto.createHash('md5');
    password = md5.update(password + password).digest('hex');
    return password;
}

exports.token = function(username) {
    var timestamp=new Date().getTime();
    var md5 = crypto.createHash('md5');
    var token = md5.update(username + timestamp).digest('hex');
    return token;

}


