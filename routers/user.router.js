var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var users = express.Router();

users.get('/create', controller.create);

users.post('/create', validate.postCreate, controller.postCreate);

module.exports = users;