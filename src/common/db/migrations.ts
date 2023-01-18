import { getLogger } from '../logging';
import { db } from './knex';

export async function runMigrations() {
  getLogger().info('Running DB migrations...');
  await db.migrate.latest();
  getLogger().info('Migrations complete!');
  await db.destroy();
}
