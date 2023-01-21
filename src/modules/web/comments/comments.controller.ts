import { ExpressRequest, ExpressResponse } from '../../../common/types';
import { usersRepository } from '../users/users.repository';
import { IUserDB } from '../users/users.types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
import { commentsService } from './comments.service';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const postComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { totalCount, comments } = await commentsService.insertComment({ ...req.query, users_id: req.users_id });

  return res.status(200).json({
    total_count: totalCount ?? 0,
    comments: comments ?? [],
  });
};

const getComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const user: Array<IUserDB> = await usersRepository.getUserById(req.users_id);

  if (!user.length) {
    return { status: 401, message: `The credentials is incorrect` };
  }
  const { totalCount, comments } = await commentsService.getComments(req.query);

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
