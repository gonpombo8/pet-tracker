import { Request } from 'express';

export default (req: Request) => {
  const header = req.headers.authorization;

  if (header && header.split(' ')[0] === 'Bearer') {
    return header.split(' ')[1];
  }

  if (req.query && req.query.jwt) {
    return req.query.jwt;
  }

  return null;
};
