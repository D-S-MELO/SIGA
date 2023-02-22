const passport = require('passport');
const User = require('../models/User');
const localStrategy = require('passport-local').Strategy;
const Users = require('../models/User');

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
    },
    async (email, senha, done) => {
      // Procura o E-mail
      const user = await Users.findOne({ email });
      if (!user) {
        return done(null, false, {
          mensagem: 'Usuário não cadastrado!',
          email,
        });
      } else {
        //Compara a senha
        const match = await user.matchPassword(senha);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            mensagem: 'Usuário ou senha inválidos!',
            email,
          });
        }
      }
    }
  )
);
//Guardando session Servidor
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Quando logado verifica permissão
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
