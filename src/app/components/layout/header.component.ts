import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Overlay, overlayConfigFactory} from 'angular2-modal';
import {AuthService} from '../../modules/auth/shared/auth.service';
import {DashboardService} from '../../modules/dashboard/dashboard.service';
import {LoadingBarService} from '../../@shared/services/loadingbar.service';

declare var require: any;
var $ = require('jquery');

@Component({
  selector: 'header',
  templateUrl: './views/header.html',
  host: {}
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private authService: AuthService,
              private route: Router,
              private loading: LoadingBarService, overlay: Overlay, vcRef: ViewContainerRef,
              private dashboardService: DashboardService) {
  }

  logOut(e): void {
    e.preventDefault();
    this.loading.start();
    this.authService.logOut().then(res => {
      this.loading.done();
      localStorage.removeItem('currentUser');
      this.route.navigate(['login']);
    });
  }

  ngOnInit(): void {
    let currentUserData = JSON.parse(localStorage.currentUser);
    this.userName = currentUserData.name;
  }

}
