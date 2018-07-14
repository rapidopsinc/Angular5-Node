import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
declare var $;

@Component({
  selector: 'model-body',
  templateUrl: './model.component.html'
})

export class ModelComponent {
  @Output() editClose: EventEmitter<any> = new EventEmitter();
  formatDate: any;
  isValidForm = true;

  constructor() {
  };

  ngOnInit() {
    console.log('on INIT CALLED');
  }

  closeModel(){
    this.editClose.emit();
  }
}
