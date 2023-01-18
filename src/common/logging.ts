import Logger, { createLogger } from 'bunyan';
const pkgInfo = require('../../package.json');

const { ENVIRONMENT, LOG_NAME_SERVICE = 'comments' } = process.env;

let __logger: Logger = null;

function initLogger(): Logger {
  if (!LOG_NAME_SERVICE) {
    throw new Error('Log name not set');
  }
  return createLogger({
    env: ENVIRONMENT,
    name: LOG_NAME_SERVICE,
    version: pkgInfo.version,
  });
}

export function getLogger(): Logger {
  if (__logger === null) {
    __logger = initLogger();
  }
  return __logger;
}
