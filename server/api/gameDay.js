const router = require('express').Router();
const {
  models: { Game, GameDay },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL PATH: http://localhost:8080/api/gameDay

// Description:   Get all gameDays
// Route:         GET /api/gameDay
router.get('/', async (req, res, next) => {
  try {
    const gameDays = await GameDay.findAll({
      include: {
        model: Game,
      },
    });
    res.json(gameDays);
  } catch (error) {
    next(error);
  }
});

// Description:   Get gameDay by id
// Route:         GET /api/gameDay/:id
router.get('/:id', async (req, res, next) => {
  try {
    const gameDay = await GameDay.findAll({
      where: { id: req.params.id },
    });
    res.json(gameDay);
  } catch (error) {
    next(error);
  }
});

// Description:   Create a game day
// Route:         POST /api/gameDay
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { gameDate } = req.body;
    const gameDay = await GameDay.create({ date: gameDate });
    res.status(201).json(gameDay);
  } catch (error) {
    next(error);
  }
});

// Description: Delete game day
// Route:       DELETE /api/gameDay/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const gameDay = await GameDay.findByPk(req.params.id);
    await gameDay.destroy();
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
});
