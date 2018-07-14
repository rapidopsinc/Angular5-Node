import { Component} from "@angular/core";
import { IDoesFilterPassParams, IFilterParams } from "ag-grid";
import { IFilterAngularComp } from "ag-grid-angular";
import * as moment from 'moment-timezone';
import { IMyDrpOptions } from 'mydaterangepicker';
//TODO - physio-date-range
/**
 * @Component AgGridDateFilterComponent
 * @description date filter for grid
 */
@Component({
  selector: 'filter-date-cell',
  template: `
      <!--<physio-date-range [options]="myDateRangePickerOptions" [(daterange)]="daterange" (daterangeChange)="onDateChanged($event)"></physio-date-range>-->
    `
})
export class AgGridDateFilterComponent implements IFilterAngularComp {
  params: IFilterParams;
  options: any;
  daterange: any;
  text: string = '';
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  constructor() { }

	/**
   * @method agInit
   * @description function to be called when aggrid is active
   * @param params
   */
  agInit(params: IFilterParams): void {
    this.params = params;
  }

	/**
   * @method isFilterActive
   * @description function to check weather filter is active or not
   * @returns {boolean}
   */
  isFilterActive(): boolean {
    return this.text !== null && this.text !== undefined && this.text !== '';
  }

	/**
   * @method doesFilterPass
   * @description function to check if filter passes or not
   * @param params
   * @returns {boolean}
   */
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return true;
  }

  /**
   * @method getModel
   * @description get text value
   * @returns {any}
   */
  getModel(): any {
    return { value: this.text };
  }

  /**
   * @method setModel
   * @description set text value that passed in queryparams in api
   * @param model
   */
  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

  /**
   * @method onDateChanged
   * @description function to be called when date changes in filter
   * @param selectedDateRange
   */
  onDateChanged(selectedDateRange): void {
    let dateObj = {
      startDate: moment(selectedDateRange.start).format('x'),
      endDate: moment(selectedDateRange.end).format('x')
    };
    this.text = JSON.stringify(dateObj);
    this.params.filterChangedCallback();
  }
}
