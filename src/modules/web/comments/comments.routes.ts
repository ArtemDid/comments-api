import { Router } from 'express';
import { CrawlerController } from './comments.controller';

export const createCrawlerRouter = () => {
  const router = Router();
  router.get('/schedule', CrawlerController.getStatusByPublisher);
  // router.get('/publisher/:publisher_id/status', CrawlerController.getStatusByPublisher);
  // router.get('/publisher/:publisher_id', CrawlerController.listCrawlingUrlsByPublisher);

  return router;
};
