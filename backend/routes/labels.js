const router = require('express').Router();
const passport = require('passport');

const labelsControllers = require('../controllers/label');

/** Роут для получения всех меток */
router.get('/', passport.authenticate('jwt', {
  session: false
}), labelsControllers.getAll);

/** Роут для получения метки по id */
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), labelsControllers.getById);

/** Роут для добавления новой метки */
router.post('/', passport.authenticate('jwt', {
  session: false
}), labelsControllers.add);

/** Роут для обновления метки по id */
router.put('/:id', passport.authenticate('jwt', {
  session: false
}), labelsControllers.updateById);

/** Роут для удаления метки по id */
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), labelsControllers.deleteById);

module.exports = router;