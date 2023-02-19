const express = require('express');
const Home = require('../controllers/Home');
const Cadastro = require('../controllers/CadastroUser');
const Usuario = require('../controllers/Usuario');
const err404 = require('../controllers/404');
const Login = require('../controllers/Login');
const router = express.Router();
router.get('/', Home.index);
router.get('/login', Login.index);
router.post('/login', Login.auth);
router.get('/usuario', Usuario.index);
router.get('/usuario/cadastro', Cadastro.index);
router.post('/usuario/cadastro', Cadastro.add);
router.get('/usuario/editar/:id', Cadastro.show);
router.get('/usuario/controleAcesso', Usuario.showControl);
router.put('/usuario/controleAcesso/:id', Usuario.showControlUser);
router.get('/usuario/controleAcesso/:id', Usuario.showControlUser);
router.put('/usuario/editar/:id', Cadastro.update);
router.delete('/usuario/deletar/:id', Cadastro.deletar);
router.get('*', err404.index);
module.exports = router;