import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import * as toastr from 'toastr';


@Component({
  selector: 'app-admin-login',
  templateUrl: './alogin.component.html',
  styleUrls: ['./alogin.component.css']
})

export class AloginComponent implements OnInit {

  Admin_email=''
  Admin_password=''

  constructor(private adminService: AdminService,
   private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.Admin_email.length == 0) {
      toastr.error('enter valid email')
    } else if (this.Admin_password.length == 0) {
      toastr.error('enter valid password')
    } else {
      this.adminService
        .login(this.Admin_email, this.Admin_password)
        .subscribe(response => {
          console.log(response)
          if (response['status'] == 'success') {
            this.router.navigate(['/admin-login/admin'])

            toastr.success('authenticated')
          } else {
            toastr.error(response['error'])
          }

        })


    }
  }



}
