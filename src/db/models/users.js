const db = require('../');

const User = db.Model.extend({
  tableName: 'users'
});

module.exports = User;
