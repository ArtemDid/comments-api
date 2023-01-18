import './common/config';
import { buildApp } from './modules/web/app';
import { getLogger } from './common/logging';
// import { runMigrations } from './common/db/migrations';
import { APP_TYPE } from './common/constants';
// import { createSimpleHealthCheckApp } from './modules/common/routes/healthcheck.routes';
import { Server } from 'http';
// import { buildWorker } from './modules/worker/urls.worker';
import * as express from 'express';

require('express-async-errors');

const { ENVIRONMENT, PORT } = process.env;
let _server: Server = null;

async function init() {
  const log = getLogger();
  log.info(
    {
      environment: ENVIRONMENT,
    },
    'app_start',
  );

  let serverApp: express.Application = null;
  log.info({ type: process.env.APP_TYPE }, 'Starting application');

  switch (process.env.APP_TYPE) {
    case APP_TYPE.API:
      // await runMigrations();
      serverApp = buildApp();
      break;
  }

  if (!serverApp) {
    throw new Error('No server app was defined, terminating');
  }

  let port = parseInt(PORT, 10);

  if (!port) {
    log.warn({}, 'Port is not defined, using default');
    port = 5000;
  }

  _server = serverApp.listen(port, () => {
    log.info(
      {
        port: PORT,
      },
      'listening...',
    );
  });
}

init().catch((err) => {
  getLogger().error(err, 'Root error');
  process.exit(1);
});
