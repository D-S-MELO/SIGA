// Criação de serviço do servidor
const express = require('express');
const path = require('path');
const { init: initHandlebars } = require('./helpers/hadlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverrride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./database');

// inicialização
const app = express();
require('./config/passport');

//middlewares
initHandlebars(app);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverrride('_method'));
app.use(
  session({
    secret: 'AppNOde',
    resave: false,
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variaveis globais
app.use((request, response, next) => {
  response.locals.success_mgs = request.flash('success_mgs');
  next();
});
app.use((request, response, next) => {
  response.locals.error_msg = request.flash('error_msg');
  next();
});

//Arquivos Estaticos
app.use(express.static(path.join(__dirname, 'assets')));

// Rotas
app.use('/', require('./routes/home'));

//Configurações Servidor
app.listen(3000, function () {
  console.log('Servidor Rodando');
});
