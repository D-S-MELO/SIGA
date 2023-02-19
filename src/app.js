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
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600000 },
  })
);
app.use(flash());
app.use(passport.initialize());

//variaveis globais
app.use((request, response, next) => {
  response.locals.success_mgs = request.flash('success_mgs');
  next();
});
//Arquivos Estaticos
app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'assets/public/imagens')));
// app.use(express.static(path.join(__dirname, 'assets/public/css')));
// app.use(express.static(path.join(__dirname, 'assets/public/controler')));

// Rotas
app.use('/', require('./routes/home'));
//Configurações Servidor

app.listen(3000, function () {
  console.log('Servidor Rodando');
});
