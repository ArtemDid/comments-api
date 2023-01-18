import knex, { Knex } from 'knex';

const { PG_CONNECTION_STRING, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const getKnexConfig = () => ({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
  migrations: {
    tableName: 'migrations',
    extension: 'js',
  },
});

export const db: Knex = knex(getKnexConfig());
