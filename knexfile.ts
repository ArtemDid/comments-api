import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { PG_CONNECTION_STRING, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: PG_CONNECTION_STRING,
    pool: {
      max: 10,
      min: 2,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'js',
    },
  },

  production: {
    client: 'postgresql',
    connection: PG_CONNECTION_STRING,
    pool: {
      max: 10,
      min: 2,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'js',
    },
  },
};

module.exports = config;
