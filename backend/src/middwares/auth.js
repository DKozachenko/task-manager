const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const CONFIG = require('../config');
const logger = require('../utils/logger');
const Users = require('../models/user');

/** Опции для стратегии */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.jwt
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await Users.findById(payload.userId);
        
        /** Если пользователь существует, отсылаем пользователя, если нет - ошибку */
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        logger.error(err);
      }
    })
  );
};