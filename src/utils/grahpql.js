import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      username
      body
      likeCount
      commentCount
      createAt
      comments {
        id
        username
        body
      }
      likes {
        id
        username
      }
    }
  }
`;
