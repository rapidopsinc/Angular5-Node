import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {CommonService} from '../../../@shared/services/common.service';

/**
 * @Component ResetForgotPassword
 * @description function to reset the forgot password
 */
@Component({
    selector: 'reset-password',
    templateUrl: 'reset-forgot-password.component.html'
    // template: require('./reset-forgot-password.component.html')

})
export class ResetForgotPasswordComponent implements OnInit {
    user: any = {};
    newPassword: any;
    newConfirmPassword: any;
    resetPasswordObj: any = {};
    isPasswordMatch: boolean = true;
    isLoading: boolean;
    resetToken: any;


    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private commonService: CommonService) {
    };

    /**
     * @method ngOnInit
     * @description function to be called when component is initialized
     */
    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.authService.validateToken(params['token']))
            .subscribe((res: any) => {
                if (res) {
                    let data = JSON.parse(res._body);
                    this.user = data.Data;
                }
            }, () => {
                this.router.navigate(['/login']);
            });
    }

    /**
     * @method resetForgotPassword
     * @param forgotPasswordForm
     * @description function to call API for reset forgot password
     */
    resetForgotPassword(forgotPasswordForm) {
        if (forgotPasswordForm.valid) {
            if (this.user.newPassword === this.user.confirmPassword) {
                this.resetPasswordObj = {
                    email: this.user.email,
                    password: this.user.newPassword
                };
                this.authService.resetForgotPasssword(this.resetPasswordObj)
                    .subscribe(() => {
                        this.router.navigate(['/login']);
                    });
            } else {
                this.commonService.showNotification({message: 'Password and confirm password are not match.'});
                this.isPasswordMatch = false;
            }
        }
    }
}


