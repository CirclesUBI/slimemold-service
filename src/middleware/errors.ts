import httpStatus from 'http-status';
import { isCelebrateError as isValidationError } from 'celebrate';

import type { NextFunction } from 'express';

import APIError from '../helpers/errors';
import logger from '../helpers/logger';
import { respondWithError } from '../helpers/responses';

export default function errorsMiddleware(
  err: Error,
  req: Express.Request,
  res: Express.Response,
  // Note: We need to pass in the 4th argument, even when its not used,
  // otherwise express.js will not give us the error itself as a first argument
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let apiError: APIError;
  // Check if error is public facing and known to us
  if (isValidationError(err)) {
    // Show validation errors to user
    apiError = new APIError(
      httpStatus.BAD_REQUEST,
      null,
      Object.values(err.details)
    );
  } else if (
    err instanceof APIError &&
    err.isPublic &&
    process.env.NODE_ENV !== 'production'
  ) {
    // Change nothing about the public API error in dev
    apiError = err;
  } else {
    // Handle error message in private
    // Log error message internally ..
    if ((err as APIError).code) {
      const message = err.message || httpStatus[(err as APIError).code];
      logger.error(
        `${message} ${(err as APIError).code} ${(err as APIError).stack}`
      );
    } else {
      logger.error(err.stack);
    }

    // .. and expose generic message to public
    apiError = new APIError(httpStatus.INTERNAL_SERVER_ERROR);
  }

  // Respond with error message and status
  respondWithError(
    res,
    {
      code: apiError.code,
      message: apiError.message || httpStatus[apiError.code],
      ...apiError.data,
    },
    apiError.code
  );
}
