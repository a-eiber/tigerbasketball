const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  time: {
    type: Sequelize.STRING,
  },
  teamOne: {
    type: Sequelize.STRING,
  },
  teamOneScore: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  teamTwo: {
    type: Sequelize.STRING,
  },
  teamTwoScore: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
});

module.exports = Game;
