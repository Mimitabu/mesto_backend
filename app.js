const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     // вставьте сюда _id созданного в предыдущем пункте пользователя
//     _id: '5dcff0fd16a9074da7cd3f04',
//   };

//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));


app.use('*', (req, res) => res.status(404).send({ massage: 'Произошла ошибка' }));


app.listen(PORT);
