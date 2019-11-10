const users = require('../data/users');
const routerUsers = require('express').Router();


routerUsers.get('/users/', (req, res) => {
  res.send(users);
});

routerUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const findUser = users.find(({ _id }) => _id === id);


  if(!findUser) {
    res.status(404).send({ "message": "Нет пользователя с таким id" });
    return;
  };
  res.status(200).send(findUser);
});

module.exports = routerUsers;