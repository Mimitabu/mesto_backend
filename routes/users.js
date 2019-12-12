const routerUsers = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('*', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.patch('/me', updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
