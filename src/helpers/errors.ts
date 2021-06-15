import httpStatus from 'http-status';
import Joi from 'joi';

class BaseError extends Error {
  name: string;
  code: number;
  isPublic: boolean;

  constructor(code: number, message: string, isPublic: boolean) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;

    if (code && code > 0) {
      this.code = code;
    } else {
      this.code = httpStatus.INTERNAL_SERVER_ERROR;
    }

    this.isPublic = isPublic;

    Error.captureStackTrace(this, this.constructor); // this, this.constructor.name
  }
}

export default class APIError extends BaseError {
  data: Array<Joi.ValidationErrorItem>;

  constructor(
    code: number = httpStatus.INTERNAL_SERVER_ERROR,
    message?: string,
    data?: Array<Joi.ValidationErrorItem>,
    isPublic = true
  ) {
    super(code, message, isPublic);
    this.data = data;
  }
}
