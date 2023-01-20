import { getLogger } from '../../../common/logging';
import { APIError, HttpStatusCode } from '../../../common/errors';
import { commentsRepository } from './comments.repository';
import { ICommentDB } from './comments.types';
import { ExpressResponse } from 'common/types';
import { generateToken } from '../../common/utils/token.utils';

const insertComment = async (data: any) => {
  const { users_id, parent_id, text } = data;
  console.log(data);
  const LIMIT: number = parseInt(data.limit?.toString()) || 100,
    OFFSET: number = parseInt(data.offset?.toString()) || 0;

  const comments = await commentsRepository.insertComment(data, LIMIT, OFFSET);
  return comments;
};

const getComments = async (data: any) => {
  // const { users_id, parent_id, text } = data;
  // console.log(data);
  const LIMIT: number = parseInt(data.limit?.toString()) || 100,
    OFFSET: number = parseInt(data.offset?.toString()) || 0;

  const comments = await commentsRepository.getComments(LIMIT, OFFSET);
  return comments;
};

// const loginUser = async (data: any, res: ExpressResponse) => {
//   const { user_name, email } = data;

//   const user: Array<IUserDB> = await urlsRepository.getUserByEmailName(email, user_name);

//   if (!user.length) {
//     return { status: 400, message: `The credentials ${user_name} is incorrect` };
//   }

//   const token: string = generateToken(user[0].id);

//   return { status: 200, token, name: user[0].user_name, email: user[0].email };
// };

export const commentsService = {
  insertComment,
  getComments,
};
