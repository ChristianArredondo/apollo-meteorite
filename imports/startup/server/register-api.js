import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import ResolutionsSchema from '../../api/resolutions/resolutions.graphql';

const typeDefs = `
  type Query {
    hi: String
    resolutions: [Resolution]
  }
`;

const resolvers = {
  Query: {
    hi() {
      return 'hello from apollo';
    },
    resolutions() {
      return [
        { _id: 'some_id', name: 'some name' },
        { _id: 'some_id_2', name: 'another thing' }
      ];
    }
  }
};

/**
 * Server
 * - init apollo server with gql schema
 * - specify context for gql requests
 */
const server = new ApolloServer({
  typeDefs: [typeDefs, ResolutionsSchema],
  resolvers,
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
