const { MASTER_DIR } = require('../helpers/constants');

const index = function (request, response, next) {
  if (request.isAuthenticated() == false) {
    return response.redirect('/login');
  } else {
    return response.render('home', { layout: MASTER_DIR });
  }
};

module.exports = { index };
