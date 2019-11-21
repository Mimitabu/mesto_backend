const Card = require('../models/card');

const getСards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => res.status(400).send({ message: 'Произошла ошибка' }));
};

const delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        res.status(404).send(`Нет карточки с таким id: ${req.params.cardId}`);
      } else {
        res.send({ status: 'OK' });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(404).send(`Нет карточки с таким id: ${req.params.cardId}`);
      } else {
        res.send({ data: like });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(404).send(`Нет карточки с таким id: ${req.params.cardId}`);
      } else {
        res.send({ data: like });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getСards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
