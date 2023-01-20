exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary().unsigned();
    table.integer('users_id').references('users.id').notNullable();
    table.integer('parent_id').references('comments.id').defaultTo(null);
    table.string('text').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
