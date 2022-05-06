const router = require('express').Router();
const {
  models: { Player, Team },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL PATH: http://localhost:8080/api/players

// Description:   Get all players
// Route:         GET /api/players
router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll({ include: Team });
    res.json(players);
  } catch (error) {
    next(error);
  }
});

// Description:   Get single player
// Route:         GET /api/players/:playerId
router.get('/:playerId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.playerId, {
      include: Team,
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// Description: Create player
// Route:       POST /api/players
router.post('/', async (req, res, next) => {
  try {
    const { values } = req.body;
    const player = await Player.create(values);
    res.status(201).json(player);
  } catch (error) {
    next(error);
  }
});

// Description: Delete Player
// Route:       DELETE /api/players/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    await player.destroy();
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// Description: Update Player
// Route:       PUT /api/players/:id
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id, { include: Team });
    const updatedPlayer = await player.update(req.body, { include: Team });
    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
});
