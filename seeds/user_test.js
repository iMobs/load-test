const faker = require('faker');

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('users').truncate();

  const rows = 10000000;
  const batchSize = 10000;

  // Inserts seed entries
  for (let i = 0; i < rows; i += batchSize) {
    const users = [];
    for (let j = 0; j < batchSize; j++) {
      users.push({
        display_name: faker.internet.userName(),
        email: faker.internet.email(),
      });
    }

    await knex.batchInsert('users', users, knex.client.config.client !== 'sqlite3' ? 1000 : 100);
  }
};
