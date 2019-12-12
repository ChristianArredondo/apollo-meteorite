import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';

import resolutionsSchema from '../../api/resolutions/resolutions.graphql';
import resolutionsResolvers from '../../api/resolutions/resolvers';

//
const simpleType = `
  type Query {
    hi: String
    resolutions: [Resolution]
  }
`;
const simpleResolver = {
  Query: {
    hi() {
      return 'hello from apollo';
    }
  }
};

/**
 * Server
 * - init apollo server with gql schema
 * - specify context for gql requests
 */
const server = new ApolloServer({
  typeDefs: [simpleType, resolutionsSchema],
  resolvers: [simpleResolver, resolutionsResolvers],
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

/**
 * Connects `ApolloServer` to a specific HTTP framework,
 * which in our case is meteor's `webapp` package and
 * executed at the `/graphql` endpoint
 */
server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
});

/** Graphql requests should be via POST */
WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
