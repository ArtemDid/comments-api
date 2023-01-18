// import * as _ from 'lodash';
// import { IDomainDB } from '../db/interfaces/domain.interface';
// import { IUrlDB } from '../db/interfaces/url.interface';
import { db } from '../db/knex';
// import { urlsRedisClient } from '../db/redis';
import { getLogger } from '../logging';

type DataUrlsType = {
  url: string;
  domain_id: number;
  is_has_asin: number;
};

// const insertUrl = async (data: Array<DataUrlsType>, tableName: string) => {
//   const log = getLogger();

//   try {
//     const isTableExists: boolean = await db.schema.withSchema('urls').hasTable(tableName);
//     const preparedData: Array<DataUrlsType> = _.uniqBy(data, 'url');

//     if (isTableExists) {
//       await db(tableName).withSchema('urls').insert(preparedData).onConflict('url').merge();

//       log.info(`Chunk of ${preparedData.length} processed in ${tableName}`);
//     } else {
//       log.warn(`Table ${tableName} does not exist`);
//     }
//   } catch (error) {
//     log.error('error', error);
//   }
// };

// const createTableWithURLs = async (nameTable: string) => {
//   if (!(await db.schema.withSchema('urls').hasTable(nameTable))) {
//     await db.schema.withSchema('urls').createTable(nameTable, table => {
//       table.increments('id').primary().unsigned();
//       table.text('url').unique();
//       table.integer('domain_id').unsigned();
//       table.integer('is_has_asin');
//       table.timestamp('found_at').defaultTo(db.fn.now());
//       table.jsonb('asins').defaultTo([]);
//       table.foreign('domain_id').references('id').inTable('status_domain').onDelete('CASCADE');
//     });
//   }
// };

// const isExistsUrl = async (parsedUrl: string, category: string) => {
//   return urlsRedisClient().zrank(category, encodeURI(parsedUrl));
// };

// const isHasDomain = async (domain: string): Promise<Array<IDomainDB>> => {
//   return db.select('*').from('status_domain').where('domain', domain).returning('*');
// };

// const upsertStatusDomain = async (req: any): Promise<Array<IDomainDB>> => {
//   return db('status_domain').insert(req).onConflict('domain').merge().returning('*');
// };

// const putStatusDomain = async (req: any, id: number): Promise<Array<IDomainDB>> => {
//   return db('status_domain').update(req).where({ id }).returning('*');
// };

const getListDomainsByPublisher = async (username: string): Promise<Array<any>> => {
  return db.select('*').from('accounts').where({ username }).returning('*');
};

// const getListUrlsByDomain = async (
//   tableName: string,
//   limit: number,
//   offset: number,
//   search: string,
//   with_asins: number
// ): Promise<{ totalCount: number; urls: Array<IUrlDB> }> => {
//   const query = db<IUrlDB>(tableName).withSchema('urls');

//   const totalCount: number = (
//     (await query
//       .clone()
//       .count('*', { as: 'count' })
//       .modify(q => {
//         if (search) q.where('url', 'like', `%${search}%`);
//         if (with_asins) q.where('is_has_asin', with_asins);
//       })
//       .first()) as { count: number }
//   ).count;

//   const urls: Array<IUrlDB> = await query
//     .modify(q => {
//       if (search) q.where('url', 'like', `%${search}%`);
//       if (with_asins) q.where('is_has_asin', with_asins);
//     })
//     .orderBy([
//       { column: 'id', order: 'desc' },
//       { column: 'found_at', order: 'desc' },
//     ])
//     .limit(limit)
//     .offset(offset);

//   return { totalCount, urls };
// };

export const urlsRepository = {
  getListDomainsByPublisher,
};
