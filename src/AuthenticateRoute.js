import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthenticateRoute({ component: Component, ...rest }) {
  const userDetails = () => {
    const details = JSON.parse(localStorage.getItem('loginDetails'));
    if (details) {
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={props =>
        userDetails() == true ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
