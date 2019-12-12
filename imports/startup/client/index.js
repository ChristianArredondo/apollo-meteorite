import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../../ui/App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// setup apollo client
const link = new HttpLink({ uri: Meteor.absoluteUrl('graphql') });
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ cache, link });

/** HOC which wrapps root app with apollo */
const ApolloApp = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
