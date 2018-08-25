'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//middle ware (turn off the extended option for body parser)
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//to send public/static assets to client
app.use(express.static('public'));

//so we know we are using pug
app.set('view engine', 'pug');

//routing
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/flashcards');

app.use(mainRoutes);
app.use('/flashcards', cardRoutes);

//error handling for 404, next to error message handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//error message handler (makes slightly easier to read)
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

//listening for requests on 3000
app.listen(3000);

