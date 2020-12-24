var express = require('express');

var controller = require('../controllers/game.controller');
var authMiddleware = require('../middleware/auth.middleware');


var game = express.Router();

game.get('/', authMiddleware.requireAuth, controller.game);

game.post('/', controller.postGame);

game.get('/biggame', authMiddleware.requireAuth, controller.BigGame);


game.post('/biggame', controller.postBigGame);

game.get('/leaderboard', controller.leaderboard);

module.exports = game;