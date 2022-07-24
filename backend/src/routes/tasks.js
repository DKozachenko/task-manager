const router = require('express').Router();
const passport = require('passport');

const tasksControllers = require('../controllers/task');

/** Роут для получения всех задач */
router.get('/', passport.authenticate('jwt', {
  session: false
}), tasksControllers.getAll);

/** Роут для получения задачи по id */
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), tasksControllers.getById);

/** Роут для добавления новой задачи */
router.post('/', passport.authenticate('jwt', {
  session: false
}), tasksControllers.add);

/** Роут для обновления задачи по id */
router.put('/:id', passport.authenticate('jwt', {
  session: false
}), tasksControllers.updateById);

/** Роут для удаления задачи по id */
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), tasksControllers.deleteById);

module.exports = router;