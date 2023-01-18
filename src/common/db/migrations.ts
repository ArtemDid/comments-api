import knex from 'knex';
import { getLogger } from '../logging';
import { getKnexConfig } from './knex';

export async function runMigrations() {
  getLogger().info('Running DB migrations...');
  const knexdb = knex(getKnexConfig());
  await knexdb.migrate.latest();
  getLogger().info('Migrations complete!');
  await knexdb.destroy();
}
