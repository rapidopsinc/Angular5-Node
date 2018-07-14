import { CommonService } from './services/common.service';
import { DataService } from './services/data.service';
import { GridComponent } from './components/grid.component';
// import { DropdownTreeviewSelectComponent } from './components/physio-dropdown-treeview/physio-dropdown-treeview.component';
// import { CrudPageHeaderComponent } from './components/crud-page-header.component';
import { AgGridTextFilterComponent } from "./components/ag-grid-components/ag-grid-text-filter.component";
// import { DataResolve } from "./services/data.resolve";
// import { PhysioRadioComponent } from "./components/form-components/physio-radio.component";
// import { PhysioUtil } from "./services/physio-util.service";
// import { PhysioCheckBoxComponent } from "./components/form-components/physio-checkbox.component";
// import { PhysioDateTimePicker } from './components/form-components/physio-date-time-picker.component'
// import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
// import { StateResolve } from "./services/state.resolve";
// import {PhysioDropZone} from "./../../../shared/components/form-components/physio-dropzone.component";
// import { PhysioDateRangeComponent } from "./components/form-components/physio-date-range.component";
import {AgGridDateFilterComponent} from "./components/ag-grid-components/ag-grid-date-filter.component";
import {NotificationService} from './services/notification.service';
import {LoadingBarService} from './services/loadingbar.service';
import {CommonDataService} from './services/commondata.service';
import {DataResolve} from './services/data.resolve';

/**
 * @Class SharedModule
 * @description class to manage the shared components and shared services
 */
export class SharedModule {
  static PROVIDERS = [
    CommonService,
    DataService,
    // PhysioUtil,
    DataResolve,
    // StateResolve,
    NotificationService,
    LoadingBarService,
    CommonDataService,
  ];
  static COMPONENTS = [
    GridComponent,
    // CrudPageHeaderComponent,
    // DropdownTreeviewSelectComponent,
    // PhysioRadioComponent,
    // PhysioCheckBoxComponent,
    // UnderConstructionComponent,
    // PhysioDateTimePicker,
    // PhysioDateRangeComponent,
    // PhysioDropZone
  ];
  static AG_GRID_COMPONENTS = [AgGridTextFilterComponent,AgGridDateFilterComponent];
}
