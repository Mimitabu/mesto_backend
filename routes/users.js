// const users = require('../data/users');
const routerUsers = require('express').Router();
const { getUsers, createUser, getUserById } = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:id', getUserById);
routerUsers.post('/users', createUser);


module.exports = routerUsers;