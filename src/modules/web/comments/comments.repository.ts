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

const insertComment = async (data: ICommentDB): Promise<{ totalCount: number; comments: Array<ICommentDB> }> => {
  const log = getLogger();

  return db('comments').insert(data);
};

const getComments = async (
  limit: number,
  offset: number,
): Promise<{ totalCount: number; comments: Array<ICommentDB> }> => {
  const totalCount: number = ((await db('comments').clone().count('*', { as: 'count' }).first()) as { count: number })
    .count;

  const comments: Array<ICommentDB> = await db('comments')
    .select(
      'comments.id',
      'comments.parent_id',
      'comments.text',
      'comments.created_at',
      'comments.updated_at',
      'users.user_name',
      'users.email',
    )
    .innerJoin('users', 'users.id', 'comments.users_id')
    .limit(limit)
    .offset(offset);

  console.log(comments);

  return { totalCount, comments };
};

// const getUserById = async (id: number): Promise<Array<IUserDB>> => {
//   return db.select('*').from('users').where({ id }).returning('*');
// };

export const commentsRepository = {
  insertComment,
  getComments,
};
