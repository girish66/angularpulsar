import {Injectable} from '@angular/core';
import {Apollo, Query, QueryRef} from 'apollo-angular';
import { map, BehaviorSubject, Observable } from 'rxjs';
import {LOGIN, ALL_USERS, Token, User, AuthenticationResult, UsersResult} from '../_models';
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
      .pipe(map((m) =>  {
        if(m.data && m.data.createAccessToken && m.data.createAccessToken.token) {
          const token = new Token();
          token.access_token = m.data.createAccessToken.token;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', token.access_token);
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
        if(m.data && m.data.users) {
          return m.data.users;
        }
        return [];
      }));
  }
}
