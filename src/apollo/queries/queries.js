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
      username
    }
  }
`;

export const GET_ALL_MEDIA = gql`
  query getAllMedia {
    getAllMedia {
      edges {
        node {
          id
          title
          description
          picture
          width
          height
        }
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

export const GET_USER_ROOMS_WITH_MESSAGES = gql`
  {
    getAllUserRooms {
      nodes {
        id
        messages {
          user {
            username
            avatar
          }
          content
        }
      }
    }
  }
`;
