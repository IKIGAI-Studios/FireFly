var route = require('express').Router();
var {user} = require('../connection');
var {uploadPhoto} = require('../middlewares/uploadPhoto');

module.exports = route;