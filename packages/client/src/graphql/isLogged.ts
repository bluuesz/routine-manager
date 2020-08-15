import { gql } from '@apollo/client';
import { UserData } from './signIn';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    user @client
  }
`;

export interface LoggedCache {
  isLoggedIn: boolean;
  user: UserData;
}
