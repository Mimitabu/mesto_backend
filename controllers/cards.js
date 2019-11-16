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

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
  )
  .then((like) => res.send({ data: like }))
  .catch((err) => res.status(404).send({ message: 'Произошла ошибка' }));
}
module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then((like) => res.send({ data: like }))
  .catch((err) => res.status(404).send({ message: 'Произошла ошибка' }));
}