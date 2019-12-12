const Card = require('../models/card');

const getСards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => res.status(400).send({ message: err }));
};

const delCard = async (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  let card;
  try {
    card = await Card.findOne({ _id: cardId });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
  if (!card) {
    res.status(404).send(`Нет карточки с таким id: ${cardId}`);
    return;
  }
  if (String(card.owner) === _id) {
    let deletedCard;
    try {
      deletedCard = await Card.findByIdAndRemove(cardId);
      res.send(deletedCard);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  } else {
    res.status(403).send('Нельзя удалить карточку, созданную другим пользователем');
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(422).send(`Нет карточки с таким id: ${req.params.cardId}`);
      } else {
        res.send({ data: like });
      }
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(422).send(`Нет карточки с таким id: ${req.params.cardId}`);
      } else {
        res.send({ data: like });
      }
    })
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports = {
  getСards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
