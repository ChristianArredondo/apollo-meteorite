import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Meteor } from 'meteor/meteor';

import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const App = ({ isLoading, resolutions, hi, client }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          Meteor.logout();
          client.resetStore();
        }}
      >
        Logout
      </button>
      <RegisterForm client={client} />
      <LoginForm client={client} />
      <hr />
      <h1> {hi} </h1>
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};

const resolutionsQueryGql = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(resolutionsQueryGql, {
  props: ({ data }) => ({
    isLoading: data.loading,
    hi: data.hi,
    resolutions: data.resolutions
  })
})(withApollo(App));
