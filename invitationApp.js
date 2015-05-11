
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('production'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
//启用压缩
//app.use(express.compress());


app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// app.use(express.session());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
