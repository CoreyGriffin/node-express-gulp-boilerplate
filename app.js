'use strict';
const express = require('express'),
    hbs = require('hbs'),
    path = require('path'),
    log = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//importing routes
const index = require('./routes/index');

//setting port and initiating express app
const port = process.env.PORT || 3000;
let app = express();

//setting up view engine for handlebars
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// Middleware
app.use(log('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + 'public')));

//use imported routes
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = app;
