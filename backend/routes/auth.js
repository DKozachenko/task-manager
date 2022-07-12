const router = require('express').Router();

const authControllers = require('../controllers/auth');

/** Роут для логина */
router.post('/login', authControllers.login);

/** Роут для регистрации */
router.post('/register', authControllers.register);

module.exports = router;