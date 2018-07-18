import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import {User} from './user';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {DataService} from '../../../@shared/services/data.service';

@Injectable()
export class UserService  {
    constructor(private http: HttpClient,
                private dataService: DataService) {
    }


    addUserService(body: User) {
        return this.dataService.callAPI({
            url: '/root',
            body: body,
            method: 'post'
        })
    }

    getUsersForForgotPassowrd(body: User) {
        return this.dataService.callAPI({
            url: '/listusersforforgotpassword'
        })
    }

    listUser() {
        return this.dataService.callAPI({
            url: '/root'
        })
    }



    removeUser(id) {
        return this.dataService.callAPI({
            url:  '/root/' + id,
            method: 'delete',
            successMessage: 'deleteSuccess',
            errorMessage: 'deleteError'
        })
    }





    getUserById(id) {
        return this.dataService.callAPI({
            url: '/root/' + id
        })
    }



    updateUser(body: User, id) {
        return this.dataService.callAPI({
            url:'/root/' + id,
            body: body,
            successMessage: 'editSuccess',
            errorMessage: 'editError'
        })
    }

}


@Injectable()
export class GetUserResolve implements Resolve<any> {
    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getUserById(route.params['id']);
    }
}


