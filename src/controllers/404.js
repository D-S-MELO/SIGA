const { MASTER_DIR } = require('../helpers/constants');

const index = function (request, response, next) {
  return response.render('404', { layout: MASTER_DIR });
};

module.exports = { index };
