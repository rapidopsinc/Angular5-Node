import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {UserService} from './user.service';

@Injectable()

export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return Observable.fromPromise(this.userService.listUser());
    }
}
