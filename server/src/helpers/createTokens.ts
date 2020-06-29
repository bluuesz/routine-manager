import { sign } from 'jsonwebtoken';
import User from '../db/models/User';
import { SECRET_SESSION } from '../utils/constants';

export const createTokens = (user: User) => {
  const token = sign({ id: user.id }, SECRET_SESSION, {
    expiresIn: '30min',
  });

  return { token };
};
