import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../../ui/App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MeteorAccountsLink } from 'meteor/apollo';

// setup apollo client
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([new MeteorAccountsLink(), new HttpLink({ uri: '/graphql' })])
});

/** HOC which wrapps root app with apollo */
const ApolloApp = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
