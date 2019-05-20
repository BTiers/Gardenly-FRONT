import gql from 'graphql-tag';

const CHAT_SUBSCRIPTION = gql`
  subscription {
    chatSubscription {
      room {
        id
      }
      user {
        username
        avatar
      }
      id
      content
    }
  }
`;

export { CHAT_SUBSCRIPTION };
