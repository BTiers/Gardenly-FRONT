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

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $users: [ID!]!) {
    createRoom(input: { name: $name, users: $users }) {
      room {
        id
        name
        messages {
          user {
            id
            username
            avatar
          }
          id
          content
          createdAt
        }
      }
    }
  }
`;
