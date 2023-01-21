import { Router } from 'express';
import { CommentsController } from './comments.controller';
import { authMiddleware } from './middlewares/comments.auth';
import { validateSchema } from '../../../common/middlewares/validate';
import { commentSchema } from './middlewares/comments.schema';

export const createCommentsRouter = () => {
  const router = Router();
  router.post('/', validateSchema(commentSchema), authMiddleware, CommentsController.postComment);
  router.get('/', authMiddleware, CommentsController.getComment);

  // router.get('/publisher/:publisher_id/status', CrawlerController.getStatusByPublisher);
  // router.get('/publisher/:publisher_id', CrawlerController.listCrawlingUrlsByPublisher);

  return router;
};
