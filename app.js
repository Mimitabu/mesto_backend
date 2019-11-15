const express = require('express');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cards = require('./routes/cards');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cards);
app.use('/', users);

app.listen(PORT);