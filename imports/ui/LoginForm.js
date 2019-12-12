import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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

  onSubmitLogin = evt => {
    evt.preventDefault();

    Meteor.loginWithPassword(this.state.email, this.state.password, error => {
      if (!error) {
        this.setState({ email: '', password: '' });
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitLogin}>
        <p>Login</p>
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
        <button type="submit">Login</button>
      </form>
    );
  }
}
