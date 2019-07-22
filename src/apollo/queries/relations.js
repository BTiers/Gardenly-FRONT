import gql from 'graphql-tag';

export const USER_RELATIONS = gql`
  query userRelations {
    user: getCurrentUser {
      id
      relations {
        id
        user {
          id
          username
        }
        friend {
          id
          username
        }
        state
      }
    }
  }
`;

export const CREATE_RELATION = gql`
  mutation createRelation($username: String!, $state: Int!) {
    createRelation(input: { username: $username, state: $state }) {
      relation {
        id
        user {
          id
          username
        }
        friend {
          id
          username
        }
        state
      }
    }
  }
`;

export const CHANGE_RELATION = gql`
  mutation changeRelation($id: ID!, $state: Int!) {
    changeRelation(input: { id: $id, state: $state }) {
      relation {
        id
        user {
          id
          username
        }
        friend {
          id
          username
        }
        state
      }
    }
  }
`;

export const DELETE_RELATION = gql`
  mutation deleteRelation($id: ID!) {
    deleteRelation(input: { id: $id }) {
      relation {
        id
        user {
          id
          username
        }
        friend {
          id
          username
        }
        state
      }
    }
  }
`;
