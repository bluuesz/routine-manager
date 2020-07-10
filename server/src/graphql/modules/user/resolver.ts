import bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import User from '../../../db/models/User';

import generateToken from '../../../helpers/generateToken';
import { Context } from '../../context';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const resolvers: IResolvers = {
  Query: {
    me: (_, __, { userId }: Context) => {
      if (!userId) {
        throw new Error('Not Authenticated');
      }
      return User.findById(userId);
    },
  },
  Mutation: {
    register: async (_, { name, email, password }: IUser) => {
      const existEmail = await User.findOne({ email });

      if (existEmail) {
        throw new Error('This email already exists');
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      return user;
    },
    login: async (_, { email, password }: IUser) => {
      const user = await User.findOne({ email }); // refactor model this

      if (!user) throw new Error('User not found');

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) throw new Error('Password does not match');

      const { token } = generateToken(user);

      return { user, token };
    },
  },
};

export default resolvers;
