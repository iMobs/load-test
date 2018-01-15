
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('email');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
