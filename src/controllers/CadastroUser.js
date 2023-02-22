const User = require('../models/User');
const { MASTER_DIR } = require('../helpers/constants');

const index = function (request, response, next) {
  return response.render('formUser', { layout: MASTER_DIR });
};

const add = async function (request, response, next) {
  const {
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    email,
    senha,
    escolaridade,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  } = request.body;
  const novoUsuario = new User({
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    email,
    senha,
    escolaridade,
    endereco: {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
    },
  });
  novoUsuario.senha = await novoUsuario.encryptPassword(senha);
  await novoUsuario.save({}, (err, users) => {
    if (err) {
      const description = 'Operação Bloqueada! Usuário Já Cadastrado!';
      response.render('formUser', {
        layout: MASTER_DIR,
        err,
        description,
        nome,
        idade,
        cpf,
        dtnascimento,
        sexo,
        fixo,
        celular,
        email,
        senha,
        escolaridade,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
      });
    } else {
      request.flash('success_mgs', 'Usuário Cadastrado com Sucesso!');
      response.redirect('/usuario');
    }
  });
};

const deletar = async function (request, response, next) {
  await User.findByIdAndDelete(request.params.id);
  request.flash('success_mgs', 'Usuário Excluído com Sucesso!');
  response.redirect('/usuario');
};

const update = async function (request, response, next) {
  const {
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    escolaridade,
    email,
    senha,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  } = request.body;
  await User.findByIdAndUpdate(request.params.id, {
    nome,
    idade,
    cpf,
    dtnascimento,
    sexo,
    fixo,
    celular,
    escolaridade,
    email,
    senha,
    endereco: {
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    },
  });
  request.flash('success_mgs', 'Usuário Editado com Sucesso!');
  response.redirect('/usuario');
};

const show = async function (request, response, next) {
  const user = await User.findById(request.params.id);
  return response.render('editUser', { layout: MASTER_DIR, user });
};

module.exports = { index, add, update, show, deletar };
