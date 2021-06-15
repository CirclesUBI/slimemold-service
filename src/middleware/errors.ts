import httpStatus from 'http-status';
import { isCelebrateError as isValidationError } from 'celebrate';

import APIError from '../helpers/errors';
import logger from '../helpers/logger';
import { respondWithError } from '../helpers/responses';

// eslint-disable-next-line no-unused-vars
export default function errorsMiddleware(
  err: Error,
  req: Express.Request,
  res: Express.Response,
  next
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
