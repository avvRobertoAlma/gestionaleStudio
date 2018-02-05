var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var folders = require('./routes/folders');
var admin = require('./routes/admin');
var files = require('./routes/files');

var app = express();
var mongoUri = 'mongodb://mongo/gestionale-studio';



//set express-handlebars as default engine
// view engine setup
app.engine('handlebars', expressHbs({defaultLayout: 'main', extname:'.handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session and passport
app.use(session({secret: 'iusinaction2018Team2018gestionaleCommercialisti', resave:false, saveUninitialized:true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(mongoUri, (req, res, next, err)=>{
  if(err){
    console.log(err);
  } else {
    console.log('Connected to DB');
  }
});

require('./config/passport.js');

app.use('/files', files);
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/folders', folders);
app.use('/admin', admin);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
