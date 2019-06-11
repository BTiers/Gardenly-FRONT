import gql from 'graphql-tag';

export const USER_GARDENS = gql`
  query gardenlist {
    gardens: getAllGardens {
      nodes {
        id
        name
        country
        datas: data
      }
    }
  }
`;

export const USER_GARDENS_NAMES = gql`
  query gardenlist {
    gardens: getAllUserGardens {
      nodes {
        id
        name
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUser {
    getCurrentUser {
      isModerator
      email
      username
      firstName
      lastName
      id
      phoneNumber
      age
      dateOfBirth
      address
      avatar
      gardens {
        name
        updatedAt
        createdAt
        country
      }
    }
  }
`;

export const GET_ALL_USER_MEDIA = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      media {
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

export const GET_LUNAR_PHASES = gql`
  query getLunarPhases {
    getLunarCycleFromToday(cycles_number: 5) {
      data
      year
    }
  }
`;

export const GET_PLANT = gql`
  query getPlant($id: String!) {
    getPlant(id: $id) {
      id
      name
      description
      tips
      thumbnail
      rusticity
      waterNeed
      blossomingStart
      blossomingEnd
      updatedAt
      colors {
        name
      }
      groundTypes {
        name
      }
      heightLow
      heightHigh
      periodicities {
        name
      }
      shapes {
        name
      }
      phRangeLow
      phRangeHigh
    }
  }
`;

export const GET_ALL_PLANTS = gql`
  query getAllPlants(
    $name: String!
    $shapeIds: [ID!]
    $groundTypeIds: [ID!]
    $periodicityIds: [ID!]
    $typeIds: [ID!]
    $first: Int
    $after: String
  ) {
    getAllPlants(
      name: $name
      filters: {
        shapeIds: $shapeIds
        groundTypeIds: $groundTypeIds
        periodicityIds: $periodicityIds
        typeIds: $typeIds
      }
      first: $first
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
          description
          tips
          thumbnail
          rusticity
          waterNeed
          blossomingStart
          blossomingEnd
          updatedAt
          colors {
            name
          }
          groundTypes {
            name
          }
          heightLow
          heightHigh
          periodicities {
            name
          }
          shapes {
            name
          }
          phRangeLow
          phRangeHigh
        }
      }
    }
  }
`;

export const GET_USER_ROOMS_WITH_MESSAGES = gql`
  {
    getAllUserRooms {
      nodes {
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
