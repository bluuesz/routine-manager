import { verify } from 'jsonwebtoken';
import { SECRET_SESSION } from '../utils/constants';

interface Payload {
  id: string;
}

export default (token: string): Payload | null => {
  try {
    if (token) {
      return verify(token, SECRET_SESSION) as Payload;
    }
    throw new Error('Token is empty');
  } catch {
    return null;
  }
};
