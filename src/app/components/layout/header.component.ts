import {Component, OnInit, ViewContainerRef} from '@angular/core';
// import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Router} from '@angular/router';
import {Overlay, overlayConfigFactory} from 'angular2-modal';
import {AuthService} from '../../modules/auth/shared/auth.service';
import {DashboardService} from '../../modules/dashboard/dashboard.service';
import {LoadingBarService} from '../../@shared/services/loadingbar.service';
//import {ChatComponent,SaveDataChat} from '../../modules/chat/chat.component';

declare var require: any;
var $ = require('jquery');

@Component({
  selector: 'header',
  templateUrl: './views/header.html',
  host: {}
})
export class HeaderComponent implements OnInit {
  constructor(/*public modal: Modal,*/
              private authService: AuthService,
              private route: Router,
              private loading: LoadingBarService, overlay: Overlay, vcRef: ViewContainerRef,
              private dashboardService: DashboardService) {
    // overlay.defaultViewContainer = vcRef;

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

  userName: string;

  ngOnInit(): void {
    let currentUserData = JSON.parse(localStorage.currentUser);
    this.userName = currentUserData[0].name;
  }


}
