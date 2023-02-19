const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/Aplicacao';
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log('Conectado ao Banco Mongo'))
  .catch((err) => console.log('Erros', err));
