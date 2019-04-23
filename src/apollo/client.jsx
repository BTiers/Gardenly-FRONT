import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export default function Store({ children }) {
  const cache = new InMemoryCache({});

  const client = new ApolloClient({
    cache,
    uri: `${process.env.REACT_APP_HOST}/graphql`,
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${cookie.get('auth')}`,
          'X-CSRF-Token': cookie.get('auth')
        },
        credentials: 'include'
      });
    }
  });
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  );
}
