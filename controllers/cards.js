const Card = require('../models/card.js');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      return card;
    })
    .then((card) => {
      if (String(card.owner) === _id) {
        Card.findByIdAndRemove(cardId)
          .then((data) => res.send(data))
          .catch(next);
      } else {
        throw new AccessError('Пользователи могут удалять только свои карточки');
      }
    })
    .catch(next);
};


const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((like) => res.status(201).send({ data: like }))
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((like) => res.send({ data: like }))
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
