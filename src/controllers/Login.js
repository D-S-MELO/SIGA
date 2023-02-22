const { MASTER_DIR } = require('../helpers/constants');
const User = require('../models/User');
const passport = require('passport');

const index = function (request, response, next) {
  console.log(request.params);
  if (request.query.fail) {
    return response.render('login', {
      layout: MASTER_DIR,
      message: 'Usuário e/ou senha incorretos!',
    });
  } else {
    return response.render('login', {
      layout: MASTER_DIR,
      message: '',
    });
  }
};

const logout = function (request, response, next) {
  request.logout(function (err) {
    if (err) {
      return next(err);
    }
    response.redirect('/login');
  });
};

const auth = passport.authenticate('local', {
  failureRedirect: '/login?fail=true',
  successRedirect: '/usuario',
  failureFlash: false,
});

module.exports = { index, auth, logout };
