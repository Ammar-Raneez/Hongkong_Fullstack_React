var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
const config = require('./config');

var app = express();

const url = config.mongoUrl;
const connect = mongoose.connect(url)

connect.then(db => {
	console.log("Connected correctly to server")
}, err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());	//initialize passport


app.use('/', indexRouter);
app.use('/users', userRouter);

//*what we're gonna do is provide access to only certain operations on /dishes, promos and leaders, this can be done
//*by using our jwt strategy only on those certain routes that require authentication rather than placing it on all
//*the routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);





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
