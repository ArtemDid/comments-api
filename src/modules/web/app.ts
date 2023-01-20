import express, { Request, Response, Router } from 'express';
import { json, urlencoded } from 'body-parser';
import { createRequestLogger } from '../../common/middlewares/logger';
import cors from 'cors';
import { configureHealthCheckRouter } from '../common/routes/healthcheck.routes';
import { errorHandlerMiddleware } from '../../common/middlewares/error.middleware';
import { createCommentsRouter } from './comments/comments.routes';
import { createUsersRouter } from './users/users.routes';

export function buildApp(): express.Application {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(createRequestLogger);

  configureRoutes(app);

  app.use(errorHandlerMiddleware);

  return app;
}

function configureApiRoutes(): Router {
  const router = Router();
  router.use('/comments', createCommentsRouter());
  router.use('/users', createUsersRouter());

  return router;
}

function configureRoutes(app: express.Application) {
  configureHealthCheckRouter(app);
  app.use('/api', configureApiRoutes());
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
}
