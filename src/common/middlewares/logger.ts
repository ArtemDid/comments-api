import { NextFunction } from 'express';
import { getLogger } from '../logging';
import { ExpressRequest, ExpressResponse } from '../types';

export const createRequestLogger = (req: ExpressRequest, _res: ExpressResponse, next: NextFunction) => {
  req.log = getLogger();
  next();
};
