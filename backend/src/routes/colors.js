const router = require('express').Router();
const passport = require('passport');

const colorsControllers = require('../controllers/color/color');

/** Роут для получения всех цветов */
router.get('/', passport.authenticate('jwt', {
  session: false
}), colorsControllers.getAll);

/** Роут для получения цвета по id */
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), colorsControllers.getById);

module.exports = router;