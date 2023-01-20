import Logger from 'bunyan';
import { NextFunction, Request, Response } from 'express';
import { ReadStream } from 'fs';

export type ExpressNextFunction = NextFunction;

export interface ExpressRequest extends Request {
  log?: Logger;
  users_id?: number;
  auth?: {
    iss: string;
    sub: string;
    aud: Array<string>;
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    permissions?: Array<string>;
    roles?: Array<string>;
  };
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    stream: ReadStream;
    buffer: Buffer;
  };
}

export type ExpressResponse = Response;
