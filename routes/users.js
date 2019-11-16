// const users = require('../data/users');
const routerUsers = require('express').Router();
const { getUsers, createUser, getUserById, updateUser, updateAvatar } = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:id', getUserById);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar);

module.exports = routerUsers;