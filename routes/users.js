const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(100),
  }),
}), updateUser);
routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = routerUsers;
