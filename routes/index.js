const express = require('express');
const router = express.Router();

//Routes
//home route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('hello');
    };
});

//hello route
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name){
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

//goodbye route; Figure out why is the request not read?
router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('hello');
});

module.exports = router;