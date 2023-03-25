import {User} from './user';

export interface AuthenticationResult {
  createAccessToken: CreateAccessToken;
}

export interface CreateAccessToken {
  detail: TokenDetail;
  __typename: string;
}

export interface TokenDetail {
  token: string;
  expiresAt?: Date;
  userName?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  roles?: string;
}


export interface UsersResult {
  users: User[];
}

export interface UserCreateResult {
  createUser: boolean;
}

export type RoleType = {
  role: number;
  code: string;
}


