const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .populate('user')
  .then((users) => res.send({data: users}))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
   User.findById(req.params.userId)
    .populate('user')
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};


