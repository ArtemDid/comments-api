import { ExpressRequest, ExpressResponse } from '../../../common/types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
import { commentsService } from './comments.service';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const postComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { totalCount, comments } = await commentsService.insertComment({ ...req.query, users_id: req.users_id });

  return res.status(200).json({
    total_count: totalCount ?? 0,
    urls: comments ?? [],
  });
};

const getComment = async (req: ExpressRequest, res: ExpressResponse) => {
  const { totalCount, comments } = await commentsService.getComments(req.query);

  return res.status(200).json({
    total_count: totalCount ?? 0,
    urls: comments ?? [],
  });
};

export const CommentsController = {
  postComment,
  getComment,
};
