import React from 'react';
import { Meteor } from 'meteor/meteor';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default UserAuthSection = ({ user, client }) => {
  if (!user) {
    return (
      <div>
        <RegisterForm client={client} />
        <LoginForm client={client} />
      </div>
    );
  }

  const onLogout = () => {
    Meteor.logout();
    client.resetStore();
  };
  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
};
