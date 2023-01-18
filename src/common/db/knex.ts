import knex, { Knex } from 'knex';
const { ENVIRONMENT } = process.env;
const config = require('../../../knexfile.ts')[ENVIRONMENT];

export const db: Knex = knex(config);
