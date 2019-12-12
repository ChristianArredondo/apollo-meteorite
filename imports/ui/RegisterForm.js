import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onSubmitRegistration = evt => {
    evt.preventDefault();

    Accounts.createUser({ email: this.state.email, password: this.state.password }, error => {
      if (!error) {
        this.setState({ email: '', password: '' });
        this.props.client.resetStore();
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitRegistration}>
        <p>Register</p>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={this.onChange}
          value={this.state.email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.onChange}
          value={this.state.password}
        />
        <button type="submit">Register</button>
      </form>
    );
  }
}
