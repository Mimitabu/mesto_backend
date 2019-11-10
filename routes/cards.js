const cards = require('../data/cards');
const routerCards = require('express').Router();

routerCards.get('/cards/', (req, res) => {
  if(!cards) {
    res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден'});
    return;
  };
  res.status(200).send(cards);
});

module.exports = routerCards;