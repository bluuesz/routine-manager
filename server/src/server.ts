import * as dotenv from 'dotenv';

import express from 'express';
import { ApolloServer, Config } from 'apollo-server-express';

import dbConnect from './db';
import auth from './middleware/auth';

dotenv.config();

export default ({ typeDefs, resolvers }: Config): void => {
  dbConnect(process.env.DB_URL || 'you-db-url');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const tokenWithBearer = req.headers.authorization || '';
      const [bearer, token] = tokenWithBearer.split(' ');
      const user = auth(token);

      return {
        userId: user?.id,
        req,
        res,
      };
    },
  });

  const app = express();

  server.applyMiddleware({ app });

  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
};
