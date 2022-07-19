const router = require('express').Router();

const tasksControllers = require('../controllers/task');

/** Роут для получения всех задач */
router.get('/', tasksControllers.getAll);

/** Роут для получения задачи по id */
router.get('/:id', tasksControllers.getById);

/** Роут для добавления новой задачи */
router.post('/', tasksControllers.add);

/** Роут для обновления задачи по id */
router.put('/:id', tasksControllers.updateById);

/** Роут для удаления задачи по id */
router.delete('/:id', tasksControllers.deleteById);

module.exports = router;