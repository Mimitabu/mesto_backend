const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send(`'Нет пользователя с таким id: '${req.params.userId}`);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err }));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
