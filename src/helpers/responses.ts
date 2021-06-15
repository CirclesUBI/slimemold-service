import httpStatus from 'http-status';

import type { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = Record<string, any>;

function respond(res, status, data, code) {
  res.status(code).json({
    status,
    ...data,
  });
}

export function respondWithSuccess(
  res: Response,
  data: Data,
  status = httpStatus.OK
): void {
  respond(res, 'ok', { data }, status);
}

export function respondWithError(
  res: Response,
  data: Data,
  code: number | string = httpStatus.INTERNAL_SERVER_ERROR
): void {
  respond(res, 'error', data, code);
}
