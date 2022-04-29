const router = require('express').Router();
const {
  models: { Game, GameDay },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL PATH: http://localhost:8080/api/games

// Description:   Get all games
// Route:         GET /api/games
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// Description:   Get all games by date
// Route:         GET /api/games/:date
router.get('/:date', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: { gameDate: req.params.date },
    });
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// Description:   Create a game
// Route:         PUT /api/games
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
});

// Description: Delete game
// Route:       DELETE /api/stories/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    await game.destroy();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
});
