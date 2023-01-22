import { getLogger } from '../../../common/logging';
import { APIError, HttpStatusCode } from '../../../common/errors';
import { commentsRepository } from './comments.repository';
import { ICommentDB } from './comments.types';
import { ExpressResponse } from 'common/types';
import { generateToken } from '../../common/utils/token.utils';

const insertComment = async (text: any, parent_id: any, limit: any, offset: any, users_id: any) => {
  await commentsRepository.insertComment({ text, parent_id, users_id });
  const comments = getComments(limit, offset);
  return comments;
};

const getComments = async (limit: any, offset: any) => {
  const LIMIT: number = parseInt(limit?.toString()) || 25,
    OFFSET: number = parseInt(offset?.toString()) || 0;

  const comments = await commentsRepository.getComments(LIMIT, OFFSET);

  comments.comments = getParsedComments(comments.comments);

  return comments;
};

const getParsedComments = (comments: Array<ICommentDB>) => {
  const newArray: any = [];
  const allChildrens: any = [];

  for (const item of comments) {
    const childrens = [];

    for (const item1 of comments) {
      if (item1.parent_id === item.id) {
        childrens.push(item1);
        !allChildrens.includes(item1) && allChildrens.push(item1);
      }
    }
    item.childrens = childrens;
    !allChildrens.includes(item) && newArray.push(item);
  }
  return newArray;
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
