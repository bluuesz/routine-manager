import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { IS_LOGGED_IN } from './graphql/isLogged';

import Routes from './routes/';
import ResetCSS from './styles/reset';

import { ToastContainerCustom } from './styles/toast';
import 'react-toastify/dist/ReactToastify.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  link: authLink.concat(httpLink),
});

client.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: !!localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : false,
  },
});

// TODO: tipar as queries

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
      <ResetCSS />
      <ToastContainerCustom />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
