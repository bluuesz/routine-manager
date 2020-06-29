import 'reflect-metadata';
import express from 'express';
import { ApolloServer, Config } from 'apollo-server-express';

import dbConnect from './db';
import auth from './middleware/auth';

export default ({ typeDefs, resolvers }: Config): void => {
  dbConnect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const tokenWithBearer = req.headers.authorization || '';
      const [_, token] = tokenWithBearer.split(' ');
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
