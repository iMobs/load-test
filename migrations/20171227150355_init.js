
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('email');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
