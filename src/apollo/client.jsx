import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
// import Cookies from 'universal-cookie';

export default function Store({ children }) {
  // const cookie = new Cookies(); //TODO: pass down TOKENS

  const cable = ActionCable.createConsumer(
    `${process.env[`REACT_APP_HOST_CABLE_${process.env.NODE_ENV}`]}cable`
  );
  const cableLink = ActionCableLink({ cable });
  const httpLink = new HttpLink({
    uri: `${process.env[`REACT_APP_HOST_GRAPHQL_${process.env.NODE_ENV}`]}graphql`,
    credentials: 'include'
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    cableLink,
    httpLink
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  );
}
