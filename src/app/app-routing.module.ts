import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordComponent } from './password/password.component';
import { AfterloginGuard } from './afterlogin.guard';
import { BeforeloginGuard } from './beforelogin.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'loginPage',component:LoginComponent,canActivate:[AfterloginGuard]},
  {path:'logoutPage',component:LogoutComponent,canActivate:[BeforeloginGuard]},
  {path:'registerPage',component:RegisterComponent},
  {path:'passwordPage',component:PasswordComponent,canActivate:[BeforeloginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
