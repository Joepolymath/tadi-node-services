import { NextFunction, Request, Response } from 'express';
import responseUtils from '../../shared/utils/response.utils';
import { API_KEY } from '../../shared/configs/env.config';

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;
  const accessToken = headers['x-api-key'];
  if (!accessToken) {
    return responseUtils.badRequestResponse(res, 'Access token is mandatory!');
  }

  if (accessToken !== API_KEY) {
    return responseUtils.unauthorizedResponse(res, 'Invalid API Key');
  }
  next();
}
