var route = require('express').Router();
var {user} = require('../connection');
var {uploadPhoto} = require('../middlewares/uploadPhoto');

route.get('/', (req, res) => {
    res.render('index');
});

module.exports = route;