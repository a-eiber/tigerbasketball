const Sequelize = require('sequelize');
const db = require('../db');
const GameDay = require('./GameDay');
const Team = require('./Team');

const Game = db.define('game', {
  gameDate: {
    type: Sequelize.STRING,
  },
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
