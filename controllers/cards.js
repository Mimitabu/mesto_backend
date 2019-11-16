const Card = require('../models/card');

module.exports.getСards = (req, res) => {
  Card.find({})
  .populate('card')
  .then((cards) => res.send({data: cards}))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({name, link, owner})
  .then((cards) => res.send({data: cards}))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((cards) => res.send({status: 'OK'}))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
}