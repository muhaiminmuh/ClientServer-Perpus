var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

// ambil routenya
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kategoriRouter = require('./routes/kategori');
var pengarangRouter = require('./routes/pengarang');
var supplierRouter = require('./routes/supplier');
var bukuRouter = require('./routes/buku');
var transaksiRouter = require('./routes/transaksi');
var pembelianRouter = require('./routes/pembelian');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"muhaimin.com"}));
app.use(cors());

// tambahkan route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kategori', kategoriRouter);
app.use('/pengarang', pengarangRouter);
app.use('/supplier', supplierRouter);
app.use('/buku', bukuRouter);
app.use('/transaksi', transaksiRouter);
app.use('/pembelian', pembelianRouter);

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
