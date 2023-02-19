const { MASTER_DIR } = require('../helpers/constants');
const User = require('../models/User');
const passport = require('passport');

const index = function (request, response, next) {
  return response.render('login', { layout: MASTER_DIR });
};

const auth = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/usuario',
  failureFlash: true,
});

module.exports = { index, auth };
