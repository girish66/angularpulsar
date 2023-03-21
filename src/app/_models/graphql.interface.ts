import {User} from './user';

export interface AuthenticationResult {
  createAccessToken: CreateAccessToken;
}

export interface CreateAccessToken {
  token:      string;
  __typename: string;
}

export interface UsersResult {
  users: User[];
}


