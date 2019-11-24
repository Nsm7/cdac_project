import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as toastr from 'toastr';


@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user_email=''
  user_password=''

  constructor(private userService: UserService,
   private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.user_email.length == 0) {
      toastr.error('enter valid email')
    } else if (this.user_password.length == 0) {
      toastr.error('enter valid password')
    } else {
      this.userService
        .login(this.user_email, this.user_password)
        .subscribe(response => {
          console.log(response)
          if (response['status'] == 'success') {
            this.router.navigate(['/user-login/user'])
            toastr.success('authenticated')
          } else {
            toastr.error(response['error'])
          }

        })


    }
  }



}
