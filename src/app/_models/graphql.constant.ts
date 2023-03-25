import {gql} from 'apollo-angular';

export const LOGIN = gql`
  mutation($userName: String!, $password: String!) {
    createAccessToken(username: $userName, password: $password){
        detail {
        token
        expiresAt
        userId
        userName
        firstName
        lastName
        roles
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation($email: String!, $userName: String!, $password: String!, $firstName: String!, $lastName: String!, $roles: [Role]) {
    createUser(email: $email, userName: $userName, password: $password, firstName: $firstName, lastName: $lastName, roles: $roles)
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
