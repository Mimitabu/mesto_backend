const cards = require('../data/cards');
const routerCards = require('express').Router();
const { getСards, createCard, delCard } = require('../controllers/cards')

routerCards.get('/cards', getСards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', delCard);


module.exports = routerCards;