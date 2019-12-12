import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createResolutionGql = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  constructor() {
    super();
    this.state = {
      resolutionName: ''
    };
  }

  onInputChange = evt => this.setState({ resolutionName: evt.target.value });

  onSubmitResolution = async evt => {
    evt.preventDefault();

    const hasValidName = this.state.resolutionName && this.state.resolutionName.trim().length > 0;
    if (!hasValidName) {
      return;
    }

    this.props
      .createResolution({ variables: { name: this.state.resolutionName } })
      .then(() => {
        this.props.refetch();
        this.setState({ resolutionName: '' });
      })
      .catch(err => {
        console.error(err); // show message
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitResolution}>
        <input
          type="text"
          placeholder="Enter a resolution"
          onChange={this.onInputChange}
          value={this.state.resolutionName}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default graphql(createResolutionGql, { name: 'createResolution' })(ResolutionForm);
