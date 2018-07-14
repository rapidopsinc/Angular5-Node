/**
 * Created by dinesh on 18/10/17.
 */
import {Component, Input} from '@angular/core';

@Component({
  selector: 'crud-page-header',
  template: `<div class="bg-light lter b-b wrapper-md clearfix page-title">
  <div class="page-header"><div class="pull-left"><h1 class="m-n h4 text-black ng-binding">{{options.title}}</h1></div>
  <div class="pull-right m-t" *ngIf="options.button">
    <a [routerLink]="options.button.link"
       class="btn"
       [ngClass]="{'btn-success plupload_add':options.button.icon=='icon-plus'}">
       <span class="icons" [ngClass]="options.button.icon=='icon-plus'?'fa fa-plus-circle':options.button.icon"></span>
      {{options.button.text}}
    </a>
  </div></div>
</div>`
})
export class CrudPageHeaderComponent {
  @Input() options:any;
  constructor() {}
}
