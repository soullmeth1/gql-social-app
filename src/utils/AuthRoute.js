import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GetAuthContext } from '../context/authContext';

function AuthRoute({ component: Component, ...rest }) {
  const { state } = GetAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => renderComponent(state, props, Component)}
    />
  );
}

export default AuthRoute;

function renderComponent(state, props, Component) {
  return state.user ? <Redirect to="/" /> : <Component {...props} />;
}
