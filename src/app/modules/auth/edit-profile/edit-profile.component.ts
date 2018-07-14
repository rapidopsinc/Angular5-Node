import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

// import {User} from "../../user/shared/user";

@Component({
  selector: 'user-edit',
  templateUrl: './edit-profile.component.html',
  providers: [AuthService]
})
export class EditProfileComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  // userdata: User = new User();

  ngOnInit() {
    // this.userdata = JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUser(userForm) {
    if (userForm.form.valid) {
      // this.authService.updateUserService(this.userdata).then(() => {
      //     this.router.navigate(['dashboard']);
      // });
    }
  }
}
