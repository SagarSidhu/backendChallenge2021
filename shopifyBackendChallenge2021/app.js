var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = "mongodb+srv://Tester:Password123@cluster0.8oi2y.mongodb.net/test?retryWrites=true&w=majority"
global.user_logged_in = false
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('backend-challenge')
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/users/signin', usersRouter);
    
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
  })
  .catch(error => console.error(error))

module.exports = app;