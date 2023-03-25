import {Injectable} from '@angular/core';
import {Apollo, Query, QueryRef} from 'apollo-angular';
import {map, BehaviorSubject, Observable} from 'rxjs';
import {
  LOGIN,
  ALL_USERS,
  Token,
  User,
  AuthenticationResult,
  UsersResult,
  CREATE_USER,
  RoleType,
  UserCreateResult
} from '../_models';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private apollo: Apollo, private router: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  // Login.
  Login(userName: string, password: string): Observable<Token | null | undefined> {
    return this.apollo
      .mutate<AuthenticationResult, { userName: string, password: string }>({
        mutation: LOGIN,
        variables: {
          userName,
          password
        },
      })
      .pipe(map((m) => {
        if (m.data && m.data.createAccessToken && m.data.createAccessToken.detail) {
          const token: Token = {
            access_token: m.data.createAccessToken.detail.token,
            expires_in: m.data.createAccessToken.detail.expiresAt,
            firstName: m.data.createAccessToken.detail.firstName,
            lastName: m.data.createAccessToken.detail.lastName,
            userName: m.data.createAccessToken.detail.userName,
            userId: m.data.createAccessToken.detail.userId,
            roles: m.data.createAccessToken.detail.roles
          };
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // @ts-ignore
          localStorage.setItem('currentUser', token.access_token);
          // @ts-ignore
          this.currentUserSubject.next(token.access_token);
          return token;
        }
        return null;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next("");
    this.router.navigate(["login"]);
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') !== null) {
      return true;
    }
    return false;
  }

  // Users
  Users(): Observable<User[]> {
    return this.apollo
      .query<UsersResult, {}>({
        query: ALL_USERS
      })
      .pipe(map((m) => {
        if (m.data && m.data.users) {
          return m.data.users;
        }
        return [];
      }));
  }

  CreateUser(user: User): Observable<boolean | null | undefined> {
    const random: string = Math.random().toString(36).substr(2, 5);
    return this.apollo
      .mutate<UserCreateResult, { email: String, userName: String, password: String, firstName: String, lastName: String, roles: RoleType[] }>({
        mutation: CREATE_USER,
        variables: {
          // email: `${random}@test.com`,
          // userName: `${random}`,
          // password: "test123!",
          // firstName: `${random}`,
          // lastName: "123",
          email: user.email,
          userName: `${random}`,
          password: user.password,
          firstName: user.profile ? user.profile?.firstName : "",
          lastName: user.profile ? user.profile?.lastName : "",
          roles: [
            {role: 0, code: "roles"}
          ]
        },
      })
      .pipe(map((m) => {
        if (m.data) {
          //console.log(JSON.stringify(m.data));
          return m.data.createUser;
        }
        return false;
      }));
  }
}
