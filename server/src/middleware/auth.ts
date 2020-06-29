import { verify } from 'jsonwebtoken';
import { SECRET_SESSION } from '../utils/constants';

interface Payload {
  id: string;
}

const getUser = (token: string) => {
  try {
    if (token) {
      return verify(token, SECRET_SESSION) as Payload;
    }
    throw new Error('Token is empty');
  } catch {
    return null;
  }
};

export default getUser;
