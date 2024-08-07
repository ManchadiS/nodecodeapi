var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 8100;
var indexRouter = require('./routes/index');
var userRouter = require("./routes/users.js")
var hbs = require('express-handlebars');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors');

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(logger('dev'));
var http = require('http').Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'profile_images')));

app.use('/admin', indexRouter);
app.use('/api', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

var server = app.listen(port);
console.log('Magic happens at http://localhost: ' + port);
//  const mongoUrl = 'mongodb://192.168.1.23:27017/TESTHMSDB'
// const mongoUrl = 'mongodb+srv://sagarmanchadi324:WZeP3jAzg4kscH90@cluster0.xyroynn.mongodb.net/?retryWrites=true&w=majority'
const mongoUrl = "mongodb://localhost:27017/HotelDB"
var conc = mongoose.connect(mongoUrl,
    (err) => {
        if (err) {
            console.log("Error connect to mongoose TOUCH", err)
        } else {
            console.log("mongooose connected")
        }
    });
console.log(__dirname)
app.use(express.static(path.join(__dirname, "/public"), { maxAge: 31557600000000 }));
app.use(express.static(path.join(__dirname, "/profile_images"), { maxAge: 31557600000000 }));
app.use(express.static('public'));
app.use('/profile_images', express.static('profile_images'));
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, '/views')); //set path in which file is present
app.set('view engine', 'hbs');

module.exports = app;

