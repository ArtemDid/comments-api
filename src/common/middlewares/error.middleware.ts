import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { APIError, HttpStatusCode } from '../errors';
import { getLogger } from '../logging';

export async function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  let statusCode = err.status || 500;

  let message = 'Something went wrong';

  if (err instanceof ValidationError) {
    statusCode = HttpStatusCode.BAD_REQUEST;
    message = err.details[0].message;
  }

  if (err instanceof APIError) {
    statusCode = err.httpCode;
    message = err.message;
  }

  const logger = getLogger();

  logger.error(err);

  res.status(statusCode).json({ message });
}
