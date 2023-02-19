import { conection } from '../db/connection/conection.js';
const auth = async function (request, response) {
  const email = request.body.emails;
  const senha = request.body.password;
  conection.query(`SELECT * FROM login `, function (error, result, field) {
    if (error) {
      console.log(error);
    } else if (result) {
      console.log(result);
    } else {
      response.render('login', {
        Mensagem: 'E-mail ou Senha Inválidos',
      });
    }
  });
};
export default auth;
