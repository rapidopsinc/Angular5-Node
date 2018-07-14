import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
declare var $;

@Component({
  selector: 'demo-model',
  templateUrl: './demo-model.component.html'
})

export class DemoModelComponent {
  private _intervalHandler: any;

  @ViewChild('demoModelPopup') demoModalView: any;
  demoModalViewReference: any;

  constructor(
    private modalService: NgbModal) {
  };

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this._intervalHandler);
  }

  openModel() {
    this.demoModalViewReference = this.modalService.open(this.demoModalView, {
      /*windowClass: 'patient-popup',*/
      backdrop: 'static'
    });

    console.log('this.demoModalViewReference', this.demoModalViewReference);
    console.log(456);
  }

  editClose() {
    console.log('Close called');
    this.demoModalViewReference.close();
  }

}
