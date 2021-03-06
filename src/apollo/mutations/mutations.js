import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $username: String!
    $firstname: String!
    $lastname: String!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        username: $username
        firstName: $firstname
        lastName: $lastname
      }
    ) {
      user {
        id
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      expires
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSession {
    deleteSession(input: {}) {
      success
    }
  }
`;

export const CREATE_MEDIUM = gql`
  mutation CreateMedium($picture: String!, $title: String!, $description: String) {
    createMedium(input: { picture: $picture, title: $title, description: $description }) {
      medium {
        id
        title
        description
        picture
        width
        height
        thumbnail
      }
    }
  }
`;

export const UPDATE_MEDIUM = gql`
  mutation UpdateMedium($id: ID!, $title: String!, $description: String) {
    updateMedium(input: { id: $id, title: $title, description: $description }) {
      medium {
        id
        title
        description
        picture
        width
        height
        thumbnail
      }
    }
  }
`;

export const DELETE_MEDIUM = gql`
  mutation DeleteMedium($id: ID!) {
    deleteMedium(input: { id: $id }) {
      medium {
        id
      }
    }
  }
`;

export const UPDATE_GARDEN = gql`
  mutation UpdateGarden(
    $id: ID!
    $name: String
    $data: String
    $additions: String
    $modifications: String
    $deletions: String
    $latitude: String
    $longitude: String
    $country: String
  ) {
    updateGarden(
      input: {
        id: $id
        name: $name
        data: $data
        additions: $additions
        modifications: $modifications
        deletions: $deletions
        latitude: $latitude
        longitude: $longitude
        country: $country
      }
    ) {
      garden {
        id
        name
        country
        slug
        tiles {
          id
          key
          name
          data
          groundType {
            id
            name
          }
        }
        staticElements {
          id
          key
          data
        }
        plants {
          id
          data
          key
          age
          plant {
            id
            name
          }
          sunExposition
          age
        }
        data
      }
    }
  }
`;

export const CREATE_GARDEN = gql`
  mutation CreateGarden(
    $name: String!
    $data: String!
    $latitude: String!
    $longitude: String!
    $country: String!
    $items: Int!
  ) {
    createGarden(
      input: {
        name: $name
        data: $data
        latitude: $latitude
        longitude: $longitude
        country: $country
        items: $items
      }
    ) {
      garden {
        id
        name
        country
        datas: data
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $email: String
    $username: String
    $age: Int
    $address: String
    $dateOfBirth: String
    $phoneNumber: String
    $avatar: String
  ) {
    updateUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        age: $age
        address: $address
        dateOfBirth: $dateOfBirth
        phoneNumber: $phoneNumber
        avatar: $avatar
      }
    ) {
      user {
        id
      }
    }
  }
`;
