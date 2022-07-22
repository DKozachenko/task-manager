const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const CONFIG = require('../config');
const Users = require('../models/user');
const logger = require('../logger/logger');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.jwt
};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const strategy = new JwtStrategy(opts, async (payload, done) => {
  const user = Users.findById(payload.userId);

  try {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    logger.error(err);
  }
});

module.exports = strategy;