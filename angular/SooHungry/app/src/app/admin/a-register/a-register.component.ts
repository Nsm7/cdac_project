import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as toastr from 'toastr'
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-a-register',
  templateUrl: './a-register.component.html',
  styleUrls: ['./a-register.component.css']
})
export class ARegisterComponent implements OnInit {
    Admin_firstname:''
    Admin_lastname:''
    Admin_email:''
    Admin_password:''
    Admin_locality:''
    Admin_street:''
    Admin_houseno:''
    Admin_image:''

  constructor(
    private router : Router,
    private adminService:AdminService
  ) { }

  ngOnInit() { }

  onLogin() {
      if (this.Admin_firstname.length == 0) {
        toastr.error('enter valid username')
      } else if (this.Admin_email.length == 0) {
        toastr.error('enter valid email')
      }  else if (this.Admin_password.length==0) {
         toastr.error('enter valid password')
      }else {
        this.adminService
          .registerAdmin(this.Admin_firstname,this.Admin_lastname, this.Admin_email,this.Admin_password,this.Admin_locality,this.Admin_street,this.Admin_houseno,this.Admin_image)
          .subscribe(response => {
            if (response['status'] == 'success') {
              toastr.success('registered successfully')
              this.router.navigate(['/admin-login'])
            } else {
              toastr.error(response['error'])
              console.log(response)
            }
          })
      }
    }
}
