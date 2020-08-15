import { gql } from '@apollo/client';

export interface UserData {
  _id: string;
  name: string;
  email: string;
}

export interface SignInData {
  login: {
    user: UserData;
    token: string;
  };
}

export interface SignInVars {
  email: string;
  password: string;
}

const SIGN_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`;

export { SIGN_IN };
