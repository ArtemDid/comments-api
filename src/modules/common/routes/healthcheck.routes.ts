import express, { Application, Router } from 'express';
import { ExpressRequest, ExpressResponse } from '../../../common/types';

const pkgInfo = require('../../../../package.json');

const { ENVIRONMENT } = process.env;

export function configureHealthCheckRouter(app: Application) {
  app.get(['/info', '/', '/healthz', '/healthcheck'], (req: ExpressRequest, res: ExpressResponse) => {
    req?.log?.info('status_request');
    res
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-store')
      .send(
        JSON.stringify({
          status: 'ok',
          environment: ENVIRONMENT,
          time: new Date().toUTCString(),
          version: pkgInfo.version,
        }),
      );
  });
}

export function createSimpleHealthCheckApp(): Application {
  const app = express();

  configureHealthCheckRouter(app);

  return app;
}
