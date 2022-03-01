const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
//const port = process.env.PORT || 80;
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

const expressSession = require('express-session');
const passport = require('./passport.js');
const flash = require('connect-flash');


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use('/', indexRouter);

/*
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

module.exports = app;

//app.get('/', (req, res) => res.send('Hello World!'));
//app.listen(port, () => console.log(`Example app listening on port ${port}`));