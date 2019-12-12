import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const App = ({ data }) => {
  if (data.loading) return <p>Loading...</p>;

  return (
    <div>
      <h1> {data.hi} </h1>
      <ul>
        {data.resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};

const resolutionsQuery = gql`
  {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(resolutionsQuery)(App);
