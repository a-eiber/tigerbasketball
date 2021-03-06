const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/stories', require('./stories'));
router.use('/games', require('./games'));
router.use('/gameDay', require('./gameDay'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
