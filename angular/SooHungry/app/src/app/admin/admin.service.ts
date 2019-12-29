import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  url = 'http://localhost:4000/admin'

  constructor(private http: HttpClient) { }

  login(Admin_email: string, Admin_password: string) {
    const body = {
      Admin_email: Admin_email,
      Admin_password: Admin_password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerAdmin(Admin_firstname: string,Admin_lastname: string, Admin_email: string, Admin_password: string,Admin_locality: string,Admin_street: string,Admin_houseno: string,Admin_image: string) {
    const body = {
      Admin_firstname: Admin_firstname,
      Admin_lastname: Admin_lastname,
      Admin_email: Admin_email,
      Admin_password: Admin_password,
      Admin_locality: Admin_locality,
      Admin_street: Admin_street,
      Admin_houseno: Admin_houseno,
      Admin_image: Admin_image
    }

    return this.http.post(this.url + '/register', body)
  }

}
