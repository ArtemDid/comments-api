// const Knex = require('knex');
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const config: { [key: string]: any } = {
  development: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      port: parseInt(DB_PORT as string, 10) || 5432,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      port: parseInt(DB_PORT as string, 10) || 5432,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },
};

module.exports = config;
