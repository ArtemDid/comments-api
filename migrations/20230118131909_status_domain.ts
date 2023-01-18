import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('status_domain', function (table) {
    table.increments('id').primary().unsigned();
    table.integer('publisher_id').notNullable().unsigned();
    table.string('domain').notNullable().unique();
    table.string('status').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('status_domain');
}
