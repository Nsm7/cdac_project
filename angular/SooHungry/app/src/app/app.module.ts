import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { UserRegisterComponent } from './user/register/users.register.component';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { AdminComponent } from './admin/admin.component';
import { AloginComponent } from './admin/alogin/alogin.component';
import { ARegisterComponent } from './admin/a-register/a-register.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';



const routes: Route[] = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },

  // the default component
  { path: '', component: LoginComponent },

  { path: 'user-login', component: LoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  {path: 'user-login/user' , component: UserhomeComponent },
  {path: 'admin-login' , component: AloginComponent },
  { path: 'admin-register', component: ARegisterComponent },
  { path: 'admin-login/admin', component: AdminHomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent,
    UserhomeComponent,
    AdminComponent,
    AloginComponent,
    ARegisterComponent,
    AdminHomeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
