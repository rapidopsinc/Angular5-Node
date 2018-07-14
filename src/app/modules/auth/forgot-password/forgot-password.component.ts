import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {CommonService} from '../../../@shared/services/common.service';

/**
 * @Component ForgotPasswordComponent
 * @description component to manage the forgot password
 */
@Component({
    selector: 'forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
    emailId: any;
    isLoading: boolean = false;
    showError: boolean = false;

    constructor(private authService: AuthService,
                private commonService: CommonService,
                private router: Router) {
    };

    /**
     * @method forgotPassword
     * @description function to call the api to reset forgot password
     * @param forgotPasswordForm
     */
    forgotPassword(forgotPasswordForm) {
        if (forgotPasswordForm.valid) {
            this.isLoading = true;
            this.authService.forgotPassword(this.emailId)
                .subscribe(() => {
                    this.isLoading = false;
                    this.commonService.showNotification({
                        type: 'success',
                        message: 'Email has been sent to your registered email address.'
                    });
                    this.router.navigate(['/login']);
                }, () => {
                    this.showError = true;
                    this.isLoading = false;
                });
        }
    }

    /**
     * @method checkServerValidation
     * @description function to check the server validation as well local validations
     * @param form
     * @returns {boolean}
     */
    checkServerValidation(form) {
        if (form.invalid) {
            this.showError = false;
        }
        return this.showError;
    }
}

