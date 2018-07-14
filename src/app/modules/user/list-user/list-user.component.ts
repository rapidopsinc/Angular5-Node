import {Component, ViewChild} from '@angular/core';
import 'rxjs/Rx';
import {UserService} from '../shared/user.service';
import {AuthService} from '../../auth/shared/auth.service';
// import {RapidGrid} from "../../shared/rapid-grid";
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
    console.log('this.route.snapshot.data[users]', this.route.snapshot.data['users'].Data.data);

  }


  gridOptions = {
    columns: [
      {
        field: 'name',
        sort: 'asc',
        cellRenderer: (cell) => {
          return cell.data ? (cell.data.deletedAt ? '<span class="deleted">[Deleted] </span>' + cell.data.name : cell.data.name) : '';
        },
      },
      {
        headerName: 'Type', field: 'type'
      },
      {
        headerName: 'Status',
        field: 'isActive',
        width: 150,
        suppressSizeToFit: false,
        filter: 'set', filterParams: {
          values: ['Active', 'Inactive'], queryValues: ['true', 'false']
        },
        cellRenderer: (cell) => cell.data ? (cell.data.isActive ? '<i class="fa fa-check" aria-hidden="true"></i>' : '<i class="fa fa-close" aria-hidden="true"></i>') : ''
      },
    ],
    rowData: this.route.snapshot.data['users'],
    getData: (searchQuery) => this.userService.listUser(),
    deleteRow: (id) => {
      return Observable.create((subscriber) => {
        this.userService.removeUser(id)
          .subscribe(() => subscriber.next(),
            (response) => {
              if (response.error.Name == 'ValidationError') {
                if (window.confirm(response.error.Message)) {
                  this.userService.removeUser(id)
                    .subscribe(() => subscriber.next());
                }
              } else {
                let message = response.error.Message || 'Error in removing user.';
                this.commonService.showNotification({message, type: 'error'});
              }
            });
      });
    },
    editRow: (id) => this.router.navigate(['/user/edit', id])
  };

//
//     @ViewChild(RapidGrid)
//     private rapidGrid: RapidGrid;
//
//     constructor(private userService: UserService,
//                 private authService: AuthService,
//                 private commonService: CommonService) {
//     }
//
//     rapidGridOptions = {
//         columnDefs: [
//             {
//                 headerName: "UserName",
//                 field: "username"
//             },
//             {
//                 headerName: "Email",
//                 field: "email"
//             },
//             {
//                 headerName: "createdAt",
//                 field: "createdAt",
//                 cellRenderer: (cell) => this.commonService.formateListDate(cell.data.createdAt)
//             },
//             {
//                 headerName: "updatedAt",
//                 field: "updatedAt",
//                 cellRenderer: (cell) => this.commonService.formateListDate(cell.data.updatedAt)
//             },
//             {
//                 headerName: "",
//                 field: "edit",
//                 width: 35,
//                 suppressSorting: true,
//                 suppressMenu: true,
//                 cellStyle: {'text-align': 'center'},
//                 cellRenderer: (cell) => '<a href="/#/user/edit/' + cell.data._id + '"><span class="fa fa-pencil"></span></a>'
//             },
//             {
//                 headerName: "",
//                 field: "reset",
//                 width: 35,
//                 suppressSorting: true,
//                 suppressMenu: true,
//                 cellStyle: {'text-align': 'center'},
//                 cellRenderer: (cell) => '<a style="color:#ff4b4b;cursor:pointer"><span class="fa fa-key"></span></a>',
//                 onCellClicked: (options) => {
//                     if ($(options.event.target).is('a') || $(options.event.target).is('span')) {
//                         console.log(options.data.email);
//                         this.authService.recoverPassword(options.data.email);
//                     }
//                 }
//             },
//             {
//                 headerName: "",
//                 field: "delete",
//                 width: 35,
//                 suppressSorting: true,
//                 suppressMenu: true,
//                 cellStyle: {'text-align': 'center'},
//                 cellRenderer: () => '<a style="color:red;cursor:pointer"><span class="fa fa-trash"></span></a>',
//                 onCellClicked: (options) => {
//                     if (window.confirm('Are you sure you want to delete?')) {
//                         if ($(options.event.target).is('a') || $(options.event.target).is('span')) {
//                             this.userService.deleteUser(options.data._id).then(() => {
//                                 this.rapidGrid.refreshData();
//                             });
//                         }
//                     }
//                 }
//             }
//         ],
//         rowData: [],
//         GetRows: this.getRows,
//         listComponent: this
//     };
//
//     getRows() {
//         return this.listComponent.userService.getUser();
//     }
}


//
// import { Component } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
// import { CommonService } from '../../@shared/services/common.service';
// import {NotificationService} from "../shared/notification.service";
//
// /**
//  * @Component ListNotificationComponent
//  * @description component for display notification
//  * @tickets #PO-26
//  */
// @Component({
//     selector: 'list-notification',
//     templateUrl: './list-notification.component.html'
// })
// export class ListNotificationComponent {
//     pageHeaderOptions: any = { title: 'Notifications', button: { text: 'Add Notification', link: '/notification/add', icon: 'icon-plus' } };
//     gridOptions = {
//         columns: [
//             {
//                 field: 'name',
//                 sort: 'asc',
//                 cellRenderer :(cell)=>{
//                     return cell.data?(cell.data.deletedAt?'<span class="deleted">[Deleted] </span>'+cell.data.name:cell.data.name):'';
//                 },
//
//             },
//             {
//                 headerName: 'Type', field: 'type'
//             },
//             {
//                 headerName: 'Status',
//                 field: 'isActive',
//                 width: 150,
//                 suppressSizeToFit: false,
//                 filter: 'set', filterParams: {
//                     values: ['Active', 'Inactive'], queryValues: ['true', 'false']
//                 },
//                 cellRenderer: (cell) => cell.data ? (cell.data.isActive ? '<i class="fa fa-check" aria-hidden="true"></i>' : '<i class="fa fa-close" aria-hidden="true"></i>') : ''
//             },
//         ],
//         rowData: this.route.snapshot.data['notifications'],
//         getData: (searchQuery) => this.notificationService.listNotification(searchQuery),
//         deleteRow: (id) => {
//             return Observable.create((subscriber) => {
//                 this.notificationService.removeNotification(id)
//                     .subscribe(() => subscriber.next(),
//                         (response) => {
//                             if (response.error.Name == 'ValidationError') {
//                                 if (window.confirm(response.error.Message)) {
//                                     this.notificationService.removeNotification(id)
//                                         .subscribe(() => subscriber.next())
//                                 }
//                             } else {
//                                 let message = response.error.Message || 'Error in removing notification';
//                                 this.commonService.showNotification({ message, type: 'error' });
//                             }
//                         });
//             });
//         },
//         editRow: (id) => this.router.navigate(['/notification/edit', id])
//     };
//
//
// }
