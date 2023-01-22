import { ICommentDB } from './comments.types';
import { db } from '../../../common/db/knex';

const insertComment = async (data: ICommentDB): Promise<{ totalCount: number; comments: Array<ICommentDB> }> => {
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

  return { totalCount, comments };
};

export const commentsRepository = {
  insertComment,
  getComments,
};
