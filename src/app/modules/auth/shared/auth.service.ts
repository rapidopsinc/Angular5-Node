import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take';
import {DataService} from '../../../@shared/services/data.service';

@Injectable()
export class AuthService {

    constructor(private http: Http,
                private dataService: DataService) {

    }

    private headers = new Headers({'Content-Type': 'application/json'});

    isLoggedIn(): Observable<any> {
        return this.http.post(`/checkLogin`, {})
            .map((r: Response) => r)
            .take(1)
            .catch(this.handleError);
    }

    doLogin(username, password): Promise<any> {
        return this.http
            .post('/login', JSON.stringify({username: username, password: password}), {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    logOut(): Promise<any> {
        return this.http
            .get('/logout', {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);

    }


    /**
     * @method forgotPassword
     * @description function to manage the forgot password
     * @param email
     * @returns {any}
     * @tickets
     */
    forgotPassword(email: String) {
        return this.dataService.callAPI({
            url: 'recover-password',
            body: {email: email},
            method: 'post',
            showErrorMessage: false,
        })
    }

    /**
     * @method validateToken
     * @description function to validate the token
     * @param token
     * @returns {any}
     */
    validateToken(token: String) {
        return this.dataService.callAPI({
            url: '/validate-reset-password-token/' + token,
            method: 'get',
            errorMessage: 'Invalid or expired reset password token.'
        });
    }

    /**
     * @method resetForgotPasssword
     * @description function to reset password
     * @param body
     * @returns {any}
     */
    resetForgotPasssword(body) {
        return this.dataService.callAPI({
            url: '/reset-forgot-password',
            method: 'put',
            body: body,
            successMessage: 'New password set successfully.',
            errorMessage: 'Error in setting new password.'
        });
    }

    /**
     * @method changePassword
     * @description function to change password
     * @param body
     * @returns {any}
     */
    changePassword(body) {
        return this.dataService.callAPI({
            url: '/change-password',
            method: 'put',
            body: body,
            successMessage: 'Password change successfully.',
            errorMessage: 'Error in changing password.'
        });
    }

}
