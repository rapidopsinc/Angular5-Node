import { Component, ViewChild, ViewContainerRef } from "@angular/core";

import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from "ag-grid";
import { IFilterAngularComp } from "ag-grid-angular";

@Component({
  selector: 'filter-cell',
  template: `
      <div class="ag-filter ng-scope" style="left: 272px; top: 33px;">
         <span>
            <div style="padding: 6px; width: 200px;"
               id="gridColumnCustomFilter">
               <div>
                  <div style="font-weight: bold; float: left; padding-bottom: 10px;">Filter</div>
               </div>
               <div>
                 <!--<input #input style="margin: 4px 0px 10px 0px;" type="text"-->
                  <!--class="form-control ng-pristine ng-valid ng-touched"-->
                  <!--[(ngModel)]="text" placeholder="Search..." (keyup.enter)=onChange(text)>-->
               </div>
               <button class="btn btn-primary" (click)="onChange(text)">Filter</button>
               <button class="btn" (click)="text='';onChange(text)">Clear Filter</button>
            </div>
         </span>
      </div>
    `
})
export class AgGridTextFilterComponent implements IFilterAngularComp {
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  public text: string = '';

  @ViewChild('input', { read: ViewContainerRef }) public input;

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return this.text !== null && this.text !== undefined && this.text !== '';
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.text.toLowerCase()
      .split(" ")
      .every((filterWord) => {
        return this.valueGetter(params.node).toString().toLowerCase().indexOf(filterWord) >= 0;
      });
  }

  getModel(): any {
    return { value: this.text };
  }

  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

  afterGuiAttached(params: IAfterGuiAttachedParams): void {
    this.input.element.nativeElement.focus();
  }

  // noinspection JSMethodCanBeStatic
  componentMethod(message: string): void {
    alert(`Alert from PartialMatchFilterComponent ${message}`);
  }

  onChange(newValue): void {
    this.params.filterChangedCallback();
  }
}
