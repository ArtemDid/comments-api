import { ExpressRequest, ExpressResponse } from '../../../common/types';
import { usersRepository } from '../users/users.repository';
import { IUserDB } from '../users/users.types';
import { commentsService } from './comments.service';

const postComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { text, parent_id, limit, offset } = req.query;
  const { totalCount, comments } = await commentsService.insertComment(
    text.toString(),
    parent_id,
    +limit,
    +offset,
    req.users_id,
  );

  return res.status(200).json({
    total_count: totalCount ?? 0,
    comments: comments ?? [],
  });
};

const getComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { limit, offset } = req.query;

  const user: Array<IUserDB> = await usersRepository.getUserById(parseInt(req.users_id?.toString(), 10));

  if (!user.length) {
    return { status: 401, message: `The credentials is incorrect` };
  }
  const { totalCount, comments } = await commentsService.getComments(+limit, +offset);

  return res.status(200).json({
    total_count: totalCount ?? 0,
    comments: comments ?? [],
    user: { name: user[0].user_name, email: user[0].email },
  });
};

export const CommentsController = {
  postComment,
  getComment,
};
