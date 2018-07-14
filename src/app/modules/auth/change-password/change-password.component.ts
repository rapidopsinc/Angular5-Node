import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {CommonService} from '../../../@shared/services/common.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  providers: [AuthService]
})
export class ChangePasswordComponent {
  constructor(private authService: AuthService,
              private router: Router,
              private commonService: CommonService) {
  }

  passwordData: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  changePassword(userForm) {
    if (userForm.form.valid) {
      if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
        this.authService.changePassword(this.passwordData)
          .subscribe(() => {
            this.router.navigate(['/dashboard']);
          }, (error) => {
            console.log('error', error);
          });
      } else {
        this.commonService.showNotification({message: 'Password and confirm password are not matched.'});
      }
    } else {
      this.commonService.showNotification({message: 'Something went wrong.'});
    }
  }

}
