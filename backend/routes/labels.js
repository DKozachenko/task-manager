const router = require('express').Router();

const labelsControllers = require('../controllers/label');

/** Роут для получения всех меток */
router.get('/', labelsControllers.getAll);

/** Роут для получения метки по id */
router.get('/:id', labelsControllers.getById);

/** Роут для добавления новой метки */
router.post('/', labelsControllers.add);

/** Роут для обновления метки по id */
router.put('/:id', labelsControllers.updateById);

/** Роут для удаления метки по id */
router.delete('/:id', labelsControllers.deleteById);

module.exports = router;