/* eslint-disable no-param-reassign */
'use strict';

const faker = require('faker');

const generateUser = (userContext, events, done) => {
  const name = faker.internet.userName();
  const email = faker.internet.email();

  userContext.vars.name = name;
  userContext.vars.email = email;

  return done();
};

module.exports = {
  generateUser,
};
