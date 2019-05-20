import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($roomId: String!, $content: String!) {
    createMessage(input: { content: $content, roomId: $roomId }) {
      message {
        id
        content
        createdAt
        user {
          username
        }
      }
    }
  }
`;
