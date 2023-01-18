import knex, { Knex } from 'knex';
const { ENVIRONMENT } = process.env;
const config = require('../../../knexfile')[ENVIRONMENT];

export const db: Knex = knex(config);
