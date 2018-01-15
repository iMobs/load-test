const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { User } = require('./db/models');

const { version } = require('../package');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/version', (req, res) => {
  res.send(version);
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.forge({ id: req.params.id }).fetch();
  
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: 'Not Found',
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/users', async (req, res) => {
  try {
    const {
      name,
      email,
    } = req.body;

    const user = await User.forge({
      display_name: name,
      email,
    }).save();

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(500).send("couldn't create user");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = app;
