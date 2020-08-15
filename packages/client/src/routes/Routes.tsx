import React from 'react';
import {
  Route,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { IS_LOGGED_IN, LoggedCache } from '../graphql/isLogged';

interface RouterProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Routes: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { data } = useQuery<LoggedCache>(IS_LOGGED_IN);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === data?.isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/main',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Routes;
