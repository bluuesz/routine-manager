import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [bearer, token] = tokenWithBearer.split(' ');
      const user = auth(token);

      return {
        userId: user && user.id,
        req,
        res,
      };
    },
  });

  const app = express();
  app.use(cors());

  server.applyMiddleware({ app });

  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
};
