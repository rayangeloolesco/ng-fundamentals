import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {
    let loginInfo = { username: userName, password: password };
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data) => {
          this.currentUser = <IUser>data['user'];
        })
      )
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstname: string, lastname: string) {
    this.currentUser!.firstName = firstname;
    this.currentUser!.lastName = lastname;

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(
      `/api/users/${this.currentUser?.id}`,
      this.currentUser,
      options
    );
  }

  checkAuthenticationStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data) => {
          if (data instanceof Object) {
            this.currentUser = <IUser>data;
          }
        })
      )
      .subscribe();
  }

  logout() {
    this.currentUser = undefined;

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post('/api/logout', {}, options);
  }
}
