import knex, { Knex } from 'knex';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const getKnexConfig = () => ({
  client: 'pg',
  connection: {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10) || 27017,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    tableName: 'migrations',
    extension: 'ts',
  },
});

export const db: Knex = knex(getKnexConfig());
