import gql from 'graphql-tag';

const NEW_ARTICLES = gql`
  subscription {
    onArticle {
      id
    }
  }
`;

const ARTICLES = gql`
  query {
    getAllArticles {
      nodes {
        id
      }
    }
  }
`;

export { NEW_ARTICLES, ARTICLES };
