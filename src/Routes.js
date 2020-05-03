import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import User from './User';
import PrivateRoute from './PrivateRoute';
import AuthenticateRoute from './AuthenticateRoute';

function Routes() {
  return (
    <Router>
      <AuthenticateRoute exact path="/" component={Login} />
      <PrivateRoute path="/signUp" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute
        path="/user/:senderId/:receiverId/:receiverName"
        component={User}
      />
    </Router>
  );
}

export default Routes;
