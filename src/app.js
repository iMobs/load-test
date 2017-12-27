const express = require('express');
const morgan = require('morgan');

const { User } = require('./db/models');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  return User.fetchAll()
    .then((users) => {
      res.send(users);
    });
})

module.exports = app;
