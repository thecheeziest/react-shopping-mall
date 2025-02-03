import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schema from './schema';
import resolvers from './resolvers';
import { DBField, readDB } from './dbController';

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART)
      }
    }
  });
  const app = express();
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:5173', 'https://studio.apollographql.com'],
      credentials: true
    }
  });
  app.listen({ port: 8000 });
  console.log(readDB(DBField.PRODUCTS));
  console.log('Server is running on http://localhost:8000/graphql');
})();
