import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
    result: any;
    constructor(private authService: AuthService,
                private route: Router) {}

    canActivate() {
        return this.authService.isLoggedIn()
            .map((r: Response) => {
                this.result = r.json();
                if (this.result.status === "success") {
                    localStorage.setItem('currentUser', JSON.stringify(this.result.data[0]));
                    return true;
                } else
                    return false;
            })
            .take(1)
            .catch(e => {
                if (window.location.hash == '#/login') {
                    return Observable.of(true);
                }
                this.route.navigate(['login']);
                return Observable.of(true);
            });
    }
}
