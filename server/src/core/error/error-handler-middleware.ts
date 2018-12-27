import { Request, Response, NextFunction } from 'express';
import debug from 'debug';

const log = debug('tracker:[ERROR]');

export default (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) return next();

  // TODO send logs to somewhere
  log(err);

  return res.sendStatus(500);
};
