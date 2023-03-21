import {gql} from 'apollo-angular';

export const LOGIN = gql`
  mutation($userName: String!, $password: String!) {
    createAccessToken(username: $userName, password: $password){
      token
    }
  }
`;

export const ALL_USERS = gql`
  query {
    users {
      id
      email
      userName
      firstName
      lastName
      createdAt
    }
  }
`;
