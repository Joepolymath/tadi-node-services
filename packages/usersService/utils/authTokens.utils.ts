import { JWT_SECRET } from '../../shared/configs/env.config';
import * as jwt from 'jsonwebtoken';

export const generateToken = (id: string, email: string, role: string) => {
  return jwt.sign({ id, email, role }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
