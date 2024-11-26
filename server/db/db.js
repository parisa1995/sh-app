const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'shopping_app',
      password: '1995',
      database: "shopping_app",
    },
  });

  module.exports = knex;