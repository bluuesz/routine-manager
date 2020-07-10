import { sign } from 'jsonwebtoken';
import { IUser } from '../db/models/User';
import { SECRET_SESSION } from '../utils/constants';

export default (user: IUser) => {
  const token = sign({ id: user.id }, SECRET_SESSION, {
    expiresIn: '30min',
  });

  return { token };
};
