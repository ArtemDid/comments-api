import { Router } from 'express';
import { UsersController } from './users.controller';
import { validateSchema } from '../../../common/middlewares/validate';
import { userSchema } from './validation/user.schema';

export const createUsersRouter = () => {
  const router = Router();
  router.post('/registration', validateSchema(userSchema), UsersController.createUser);
  router.post('/login', validateSchema(userSchema), UsersController.login);
  // router.get('/publisher/:publisher_id', CrawlerController.listCrawlingUrlsByPublisher);

  return router;
};
