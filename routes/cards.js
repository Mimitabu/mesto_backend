const routerCards = require('express').Router();
const {
  getСards, createCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', getСards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', delCard);
routerCards.put('/cards/:cardId/likes', likeCard);
routerCards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCards;
