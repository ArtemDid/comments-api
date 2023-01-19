import { Router } from 'express';
import { CrawlerController } from './comments.controller';
import { authMiddleware } from './middlewares/comments.auth';

export const createCrawlerRouter = () => {
  const router = Router();
  router.get('/', authMiddleware, CrawlerController.getStatusByPublisher);
  // router.get('/publisher/:publisher_id/status', CrawlerController.getStatusByPublisher);
  // router.get('/publisher/:publisher_id', CrawlerController.listCrawlingUrlsByPublisher);

  return router;
};
