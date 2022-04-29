const Sequelize = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  loses: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Team;
