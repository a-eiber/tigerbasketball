const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  lastName: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  grade: {
    type: Sequelize.STRING,
  },
  streetAddress: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  fathersName: {
    type: Sequelize.STRING,
  },
  fathersPhone: {
    type: Sequelize.STRING,
  },
  fathersEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  mothersName: {
    type: Sequelize.STRING,
  },
  mothersPhone: {
    type: Sequelize.STRING,
  },
  mothersEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Player;
