const routerCards = require('express').Router();
const {
  getСards, createCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('*', getСards);
routerCards.post('*', createCard);
routerCards.delete('/:cardId', delCard);
routerCards.put('/:cardId/likes', likeCard);
routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
