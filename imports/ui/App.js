import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import ResolutionForm from './ResolutionForm';
import UserAuthSection from './UserAuthSection';
import Resolutions from './Resolutions';

const App = ({ isLoading, resolutions, client, user }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <UserAuthSection user={user} client={client} />
      <hr />
      <ResolutionForm />
      <Resolutions resolutions={resolutions} />
    </div>
  );
};

const rootQueryGql = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
    user {
      _id
      email
    }
  }
`;

const mapDataToProps = ({ data }) => ({
  isLoading: data.loading,
  resolutions: data.resolutions,
  user: data.user
});

export default graphql(rootQueryGql, {
  props: mapDataToProps
})(withApollo(App));
