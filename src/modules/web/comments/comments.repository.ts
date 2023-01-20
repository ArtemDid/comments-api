// import * as _ from 'lodash';
// import { IUserDB } from './users.types';
import { ICommentDB } from './comments.types';
import { db } from '../../../common/db/knex';
// import { urlsRedisClient } from '../db/redis';
import { getLogger } from '../../../common/logging';

type DataUrlsType = {
  url: string;
  domain_id: number;
  is_has_asin: number;
};

// const getUserByEmailName = async (email: string, user_name?: string): Promise<Array<IUserDB>> => {
//   return db
//     .select('*')
//     .from('users')
//     .modify((q) => {
//       q.where({ email });
//       if (user_name) q.where({ user_name });
//     })
//     .returning('*');
// };

const insertComment = async (
  data: ICommentDB,
  limit: number,
  offset: number,
): Promise<{ totalCount: number; comments: Array<ICommentDB> }> => {
  const log = getLogger();

  return db('comments')
    .insert(data)
    .then(async () => {
      log.info(`Comment was created`);

      return getComments(limit, offset);
    });
};

const getComments = async (
  limit: number,
  offset: number,
): Promise<{ totalCount: number; comments: Array<ICommentDB> }> => {
  const totalCount: number = ((await db('comments').clone().count('*', { as: 'count' }).first()) as { count: number })
    .count;

  const comments: Array<ICommentDB> = await db('comments').select('*').limit(limit).offset(offset);

  return { totalCount, comments };
};

// const getUserById = async (id: number): Promise<Array<IUserDB>> => {
//   return db.select('*').from('users').where({ id }).returning('*');
// };

export const commentsRepository = {
  insertComment,
  getComments,
};
