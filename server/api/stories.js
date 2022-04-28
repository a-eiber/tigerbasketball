const router = require('express').Router();
const {
  models: { Story },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL PATH: http://localhost:8080/api/stories

// Description:   Get all stories
// Route:         GET /api/stories
router.get('/', async (req, res, next) => {
  try {
    const stories = await Story.findAll();
    res.json(stories);
  } catch (error) {
    next(error);
  }
});

// Description:   Get single story
// Route:         GET /api/stories/:storyId
router.get('/:storyId', async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    res.json(story);
  } catch (error) {
    next(error);
  }
});

// Description: Create story
// Route:       POST /api/stories
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
});

// Description: Delete story
// Route:       DELETE /api/stories/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    await story.destroy();
    res.json(story);
  } catch (error) {
    next(error);
  }
});

// Description: Update Story
// Route:       PUT /api/stories/:id
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    const updatedStory = await story.update(req.body);
    res.json(updatedStory);
  } catch (error) {
    next(error);
  }
});
