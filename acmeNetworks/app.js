

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');



var app = express();


var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// enable CORS Cross Origin Resource Sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));


app.use(bodyParser.json({type:'application/ld+json'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/RFSCatalogue/', bodyParser.json(), function(req, res) {
    //res.contentType("application/ld+json");
    console.log("POST to http://lesterthomas.ddns.net:3000/api/RFSCatalogue",req.body);
    console.log("name",JSON.stringify(req.body.name));
    console.log("description",JSON.stringify(req.body.name));
    //res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

    //request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue"&endkey="RFSCatalogue:99999"&include_docs=true', function (error, response, body) {
        
        res.send("OK");
    //})
  
});

app.use('/', routes);
app.use('/api', api);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
