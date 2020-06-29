import bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import User, { findUser } from '../../../db/models/User';

import { createTokens } from '../../../helpers/createTokens';
import { Context } from '../../context';

interface IUser {
  username: string;
  email?: string;
  password: string;
}

const resolvers: IResolvers = {
  Query: {
    me: (_, __, { userId }: Context) => {
      if (!userId) {
        throw new Error('Not Authenticated');
      }
      return findUser(userId);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }: IUser) => {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({
        username,
        email,
        password: hashPassword,
      }).save();

      return true;
    },
    login: async (_, { username, password }: IUser) => {
      const user = await User.findOne({ where: { username } }); // refactor model this

      if (!user) throw new Error('User not found');

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) throw new Error('Password does not match');

      const { token } = createTokens(user);

      return { user, token };
    },
  },
};

export default resolvers;
