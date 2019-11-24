import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  url = 'http://localhost:4000/user'

  constructor(private http: HttpClient) { }

  login(user_email: string, user_password: string) {
    const body = {
      user_email: user_email,
      user_password: user_password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerUser(user_firstname: string, user_email: string, user_password: string) {
    const body = {
      user_firstname: user_firstname,
      user_email: user_email,
      user_password: user_password
    }

    return this.http.post(this.url + '/register', body)
  }

}
