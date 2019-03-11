import { AuthData } from './../auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData =  {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {

    const authData: AuthData =  {email: email, password: password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData).subscribe(response => {
    console.log(response);
    const token = response.token;

    if (token) {
      this.token = token;
      this.authStatusListener.next(true);
      this.isAuth = true;
    }
  });
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
  }


  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuth;
  }
}
