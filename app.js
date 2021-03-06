var createError = require('http-errors');
var express = require('express');
var path = require('path');
let mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
let passport = require('passport');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to mongodb');
})

require('./config/passport')(passport);

let indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bootstrap')))

app.use(session({
	secret: 'testingpleasework',
	resave: true,
	saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app);
require('./routes/auth')(app, passport);
require('./routes/profile')(app, mongoose);
require('./routes/blog')(app, mongoose);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
