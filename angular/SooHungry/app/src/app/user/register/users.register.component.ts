import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as toastr from 'toastr'
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-register',
    templateUrl: './users.register.component.html',
    styleUrls:['./users.register.component.css']
})

export class UserRegisterComponent implements OnInit {
    user_firstname:''
    user_email:''
    user_password:''

    constructor(
    private router : Router,
    private userService:UserService
    ) { }

    ngOnInit() { }

    onLogin() {
        if (this.user_firstname.length == 0) {
          toastr.error('enter valid username')
        } else if (this.user_email.length == 0) {
          toastr.error('enter valid email')
        }  else if (this.user_password.length==0) {
           toastr.error('enter valid password')
        }else {
          this.userService
            .registerUser(this.user_firstname, this.user_email,this.user_password)
            .subscribe(response => {
              if (response['status'] == 'success') {
                toastr.success('registered successfully')
                this.router.navigate(['/user-login'])
              } else {
                toastr.error(response['error'])
                console.log(response)
              }
            })
        }
      }
}
