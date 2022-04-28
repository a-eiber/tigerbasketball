const router = require('express').Router();
const {
  models: { Player, Team },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL PATH: http://localhost:8080/api/teams

// Description:   Get all teams
// Route:         GET /api/teams
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const teams = await Team.findAll({ include: Player });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

// Description:   Get single team
// Route:         GET /api/teams/:teamId
router.get('/:teamId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.teamId, {
      include: Player,
    });
    res.json(team);
  } catch (error) {
    next(error);
  }
});

// Description: Create team
// Route:       POST /api/teams
router.post('/', async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

// Description: Delete Team
// Route:       DELETE /api/teams/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id);
    await team.destroy();
    res.json(team);
  } catch (error) {
    next(error);
  }
});

// Description: Update Team
// Route:       PUT /api/teams/:id
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id, { include: Player });
    const updatedTeam = await team.update(req.body, { include: Player });
    res.json(updatedTeam);
  } catch (error) {
    next(error);
  }
});
