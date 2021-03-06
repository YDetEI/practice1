// var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var bodyParser = require('body-parser');

//#8
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// //1
// app.get('/', function(req, res) {
//     res.send('hello world');
// });
// app.get('/about', function(req, res) {
//     res.send('about this page!');
// });

// //2
// app.get('/users/:name?', function(req, res) {
//     if (req.params.name) {
//         res.send('hello, ' + req.params.name);
//     } else {
//         res.send('hello, nobody!');
//     }
// });
// app.get('/items/:id([0-9]+)', function(req, res) {
//     res.send('item no: ' + req.params.id);
// });

// //3
// app.use(express.static(__dirname + '/text'));
// app.get('/1.txt', function(req, res) {
//     res.sendfile(__dirname + '/text/1.txt');
// });




// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.static(__dirname + '/text'));

app.get('/new', function(req, res) {
    res.render('new');
});
app.post('/create', function(req, res) {
    res.send(req.body.name);

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'text')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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