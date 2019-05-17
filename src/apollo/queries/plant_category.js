import gql from 'graphql-tag';

export const GET_PLANT_COLORS = gql`
  query GetColors {
    getColors
  }
`;

export const GET_PLANT_GROUNDTYPES = gql`
  query GetGroundTypes {
    getGroundTypes {
      name
      id
    }
  }
`;

export const GET_PLANT_PERIODICITIES = gql`
  query GetPeriodicities {
    getPeriodicities {
      name
      id
    }
  }
`;

export const GET_PLANT_SHAPES = gql`
  query GetShapes {
    getShapes {
      name
      id
    }
  }
`;

export const GET_PLANT_TYPES = gql`
  query GetTypes {
    getTypes {
      name
      id
    }
  }
`;