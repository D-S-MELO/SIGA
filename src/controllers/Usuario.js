const { MASTER_DIR } = require('../helpers/constants');
const User = require('../models/User');
const index = function (request, response, next) {
  User.find({}, (err, users) => {
    if (err) {
      request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os usuários');
    } else {
      response.render('user', { layout: MASTER_DIR, users });
    }
  });
};
const showControl = function (request, response, next) {
  User.find({}, (err, users) => {
    if (err) {
      request.flash('erro_mgs', 'Ocorreu um erro ao recuperar os usuários');
    } else {
      response.render('controlUser', { layout: MASTER_DIR, users });
    }
  });
};

const showControlUser = async function (request, response, next) {
  const user = await User.findById(request.params.id);
  return response.render('formControlAcesso', { layout: MASTER_DIR, user });
};
module.exports = { index, showControl, showControlUser };
