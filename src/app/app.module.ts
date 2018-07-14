// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
//
//
// import { AppComponent } from './app.component';
// import {AppRoutingModule} from './modules/app-routing.module';
//
//
// @NgModule({
//   declarations: [
//     AppComponent,
//     AppRoutingModule
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import {NgModule, Component} from "@angular/core";
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './modules/app-routing.module';
import {BrowserModule, Title} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
// import {NotificationService} from './common/notification.service';
// import {LoadingBarService} from './common/loadingbar.service';
// import {CommonDataService} from './common/commondata.service';
// import {CommonService} from "./common/common.service";
// import {DataService} from "./common/data.service";
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {inventoryModule} from "./modules/inventory/inventory.module";
import {UserModule} from "./modules/user/user.module";
import {AppComponent} from './app.component';
import {SharedModule} from './@shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';

declare var require: any;

let jQuery = require('jquery');



@NgModule({
  declarations: [
    AppComponent,
    // ...SharedModule.COMPONENTS,
    // ...SharedModule.AG_GRID_COMPONENTS
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    // NgbModule.forRoot(),
    BootstrapModalModule,
    inventoryModule,
    UserModule,
    // AgGridModule.withComponents([...SharedModule.AG_GRID_COMPONENTS]),

  ],
  exports: [],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }, {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    // ...SharedModule.PROVIDERS,


    SlimLoadingBarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
