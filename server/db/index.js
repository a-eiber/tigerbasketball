//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Story = require('./models/Story');

//associations could go here!
Team.hasMany(Player);
Player.belongsTo(Team);

module.exports = {
  db,
  models: {
    User,
    Team,
    Player,
    Story,
  },
};
