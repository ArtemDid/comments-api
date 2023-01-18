export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;

  constructor(httpCode: HttpStatusCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

/**
 * @deprecated Use HttpError class
 * */
export class APIError extends BaseError {
  constructor(httpCode = HttpStatusCode.INTERNAL_SERVER, message: any) {
    super(httpCode, message);
  }
}
