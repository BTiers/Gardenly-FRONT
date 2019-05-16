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
    gardens: getAllGardens {
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
      username
    }
  }
`;

export const GET_ALL_USER_MEDIA = gql`
  query GetCurrentUser {
    getCurrentUser {
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

export const GET_ALL_PLANTS = gql`
  query getAllPlants(
    $name: String!
    $shapeIds: [ID!]
    $groundTypeIds: [ID!]
    $periodicityIds: [ID!]
  ) {
    getAllPlants(
      name: $name
      filters: {
        shapeIds: $shapeIds
        groundTypeIds: $groundTypeIds
        periodicityIds: $periodicityIds
      }
    ) {
      edges {
        node {
          id
          name
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
