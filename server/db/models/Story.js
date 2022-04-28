const Sequelize = require('sequelize');
const db = require('../db');

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.TEXT,
  },
});

module.exports = Story;
