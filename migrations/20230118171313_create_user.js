exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary().unsigned();
    table.string('user_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('home_page');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
