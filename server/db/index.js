//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Story = require('./models/Story');
const Game = require('./models/Game');
const GameDay = require('./models/GameDay');

//associations could go here!
GameDay.hasMany(Game);
Game.belongsTo(GameDay);

Game.belongsToMany(Team, { through: 'TeamGames' });
Team.belongsToMany(Game, { through: 'TeamGames' });

Team.hasMany(Player);
Player.belongsTo(Team);

module.exports = {
  db,
  models: {
    User,
    Team,
    Player,
    Story,
    Game,
    GameDay,
  },
};
