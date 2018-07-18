import {Component, ViewChild} from '@angular/core';
import 'rxjs/Rx';
import {UserService} from '../shared/user.service';
import {AuthService} from '../../auth/shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CommonService} from '../../../@shared/services/common.service';

@Component({
  selector: 'form-list',
  templateUrl: './list-user.component.html',
  providers: [UserService]
})
export class UserListComponent {

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit() {
    console.log('this.route.snapshot.data[users]', this.route.snapshot.data['users']);
  }


}
