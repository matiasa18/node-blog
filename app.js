
/**
 * Module dependencies.
 */


var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    flash = require('connect-flash');

var app = express();

var controllers = require('./app/controllers/')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'app/public') }));
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var db = require('./app/modules/db');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
