import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetForgotPasswordComponent} from './reset-forgot-password/reset-forgot-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';


const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetForgotPasswordComponent
  }
];


const profileRoutes = [
  {path: 'edit', component: EditProfileComponent},
  {path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetForgotPasswordComponent, ChangePasswordComponent, EditProfileComponent],
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, FormsModule],
  exports: [LoginComponent, ForgotPasswordComponent, ResetForgotPasswordComponent, ChangePasswordComponent, EditProfileComponent],
  providers: [AuthService, LoggedInGuard]
})
export class AuthModule {
  static ROUTES: any = profileRoutes;
}
