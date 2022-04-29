const Sequelize = require('sequelize');
const db = require('../db');

const GameDay = db.define('gameday', {
  date: {
    type: Sequelize.DATEONLY,
    unique: true,
    allowNull: false,
  },
});

module.exports = GameDay;
