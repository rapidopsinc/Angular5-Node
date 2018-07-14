import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
// import {LoadingBarService} from "../../../common/loadingbar.service";
declare var require: any;


let $ = require('jquery');

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginFailedMsg: String = '';

  constructor(private authService: AuthService,
              private route: Router,
              private titleService: Title,
              public fb: FormBuilder,
              /*private loading:LoadingBarService*/) {

    // this.titleService.setTitle("ESCAPE59");
    authService.isLoggedIn().subscribe(r => {
      if (r.json().status == 'success')
        route.navigate(['dashboard']);
    });

    this.myForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    $('body').addClass('loginBg');
  }

  // doLogIn(event,formData):void{
  //     event.preventDefault();
  //     var controls=formData.controls;
  //     if(!formData.valid)
  //     {
  //         console.log("Called");
  //         for (var key in controls) {
  //             if (controls.hasOwnProperty(key)) {
  //                 controls[key]._touched=true;
  //             }
  //         }
  //         return;
  //     }
  //     let username=controls.username.value;
  //     let password=controls.password.value;
  //     this.loading.start();
  //     this.authService.doLogin(username,password).then(res =>{
  //         this.loading.done();
  //         if(res.json().status=="success") {
  //             $('body').removeClass('loginBg');
  //             localStorage.setItem('currentUser', JSON.stringify(res.json().data[0]));
  //             this.route.navigate(['dashboard']);
  //         }
  //         else
  //             this.loginFailedMsg=res.json().message;
  //     });
  // }
  //

  doLogIn(email, password, event): void {
    event.preventDefault();
    this.authService.doLogin(email, password).then(res => {
      if (res.json().status == 'success') {
        localStorage.setItem('currentUser', JSON.stringify(res.json().data));
        this.route.navigate(['dashboard']);
      }
      else {
        this.loginFailedMsg = res.json().message;
      }
    });
  }
}
