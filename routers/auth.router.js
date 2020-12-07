var express = require('express');

var controller = require('../controllers/auth.controller');
// var authMiddleware = require('../middleware/auth.middleware');

var auth = express.Router();

auth.get('/login', controller.login);

auth.post('/login', controller.postLogin);

module.exports = auth;