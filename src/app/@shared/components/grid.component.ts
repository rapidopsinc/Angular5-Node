import {Component, Input} from '@angular/core';

declare const $;
import * as _ from 'lodash';
import {AgGridTextFilterComponent} from './ag-grid-components/ag-grid-text-filter.component';
import {AgGridDateFilterComponent} from './ag-grid-components/ag-grid-date-filter.component';

@Component({
  selector: 'app-grid',
  template: `<ag-grid-angular style="width: 100%;height: 445px;"
                     class="ag-fresh app-grid"
                     [gridOptions]="gridOptions">
             </ag-grid-angular>`
})
export class GridComponent {
  @Input() options;
  private rowData: any;
  public gridOptions: any;
  private columnDefs: any;
  private defaultPageSize = 10;
  searchQuery: any = {rows: this.defaultPageSize, pageNo: 1};
  private isFirstLoad = true;

  constructor() {
  }

  ngOnInit() {
    this.makeGrid();
  }

  setColumns(columnsFromOptions) {
    _.each(columnsFromOptions, (column: any) => {
      const defaultOptions = {
        width: 200,
        suppressSorting: false,
        menuTabs: ['filterMenuTab'],
        suppressSizeToFit: false,
        suppressMovable: true,
        icons: {
          sortAscending: '<i class="fa fa-sort-amount-asc"/>',
          sortDescending: '<i class="fa fa-sort-amount-desc"/>'
        }
      };
      column = _.defaultsDeep(column, defaultOptions);
      column.headerName = column.headerName || _.capitalize(column.field);
      if (!column.filter) {
        column.filterFramework = AgGridTextFilterComponent;
      }
      if (column.filter == 'date') {
        column.filterFramework = AgGridDateFilterComponent;
      }
    });
    if (!this.options.disableEditDelete) {
      columnsFromOptions.push({
        headerName: 'Action',
        suppressSorting: true,
        suppressMenu: true,
        suppressSizeToFit: true,
        field: 'edit',
        width: 100,
        cellStyle: {'text-align': 'left'},
        cellRenderer: () => '<a class="edit-icon"><span class="icons fa fa-pencil"></span> Edit</a>',
        onCellClicked: (options) => {
          if (options.data.deletedAt) {
            return;
          }
          if ($(options.event.target).is('a') || $(options.event.target).is('span')) {
            this.options.editRow(options.data.id, options.data);
          }
        }
      });
      columnsFromOptions.push({
        headerName: '',
        field: 'delete',
        suppressSorting: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        width: 100,
        cellStyle: {'text-align': 'left'},
        cellRenderer: (cell) => '<a class="trash-icon"><span class="icons fa fa-trash"></span> Delete</a>',
        onCellClicked: (cell) => {
          if (cell.data.deletedAt) {
            return;
          }
          if ($(cell.event.target).is('a') || $(cell.event.target).is('span')) {
            if (window.confirm('Do you want to delete this item?')) {
              this.options.deleteRow(cell.data.id, cell.data).subscribe(() => this.setDataSourceForGrid());
            }
          }
        }
      });
    }
    this.columnDefs = columnsFromOptions;
  }

  makeGrid() {
    this.setColumns(this.options.columns);
    this.searchQuery = this.searchQuery || {};
    this.gridOptions = {
      rowModelType: 'infinite',
      enableSorting: true,
      enableFilter: true,
      enableServerSideSorting: true,
      enableServerSideFilter: true,
      rowHeight: 40,
      headerHeight: 40,
      pagination: true,
      maxConcurrentDatasourceRequests: 2,
      infiniteInitialRowCount: 1,
      paginationPageSize: this.defaultPageSize,
      cacheBlockSize: this.defaultPageSize,
      maxBlocksInCache: 1,
      cachedBlockSize: this.defaultPageSize,
      columnDefs: this.columnDefs,
      suppressContextMenu: true,
      rowClassRules: {
        'disabled-row': function (params) {
          return params.data ? params.data.deletedAt : false;
        }
      },
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center" style="border:none;"><img src="assets/loading.gif"></span>',
      overlayNoRowsTemplate: `<div style="color:gray;font-size:18px;">
        <i class="fa fa-exclamation-triangle" aria-hidden="true" style="font-size: 50px;"></i> <br>
        No records found.
      </div>`,
      onGridReady: () => {
        this.setDataSourceForGrid();
      },
      localeText: {
        next: '<span class="fa fa-caret-right icons" title="next"></span>',
        last: '<span class="fa fa-forward icons" title="last"></span>',
        first: '<span class="fa fa-backward icons" title="first"></span>',
        previous: '<span class="fa fa-caret-left icons" title="previous"></span>'
      }
    };
  }

  setDataSourceForGrid() {
    const dataSource = {
      rowCount: null,
      getRows: (params) => {
        //set sorting
        if (params.sortModel.length) {
          this.searchQuery.sortBy = params.sortModel[0].colId;
          this.searchQuery.sortOrder = params.sortModel[0].sort;
        }
        //FIXME remove the loader when there is error
        this.gridOptions.api.showLoadingOverlay();
        //set paging
        this.searchQuery['pageNo'] = params.endRow / this.searchQuery.rows;
        //set the filter here
        if (params.filterModel && !this.searchQuery.forceFilter) {
          _.each(params.filterModel, (value, key) => {
            this.searchQuery[key] = value.value;
            //if value is array then it's set filter
            if (value instanceof Array) {
              const searchArray = [];
              //convert the display values in search query values.
              const queryParamValues = _.find(this.gridOptions.columnDefs, {field: key}).filterParams.queryValues;
              const filterValues = _.find(this.gridOptions.columnDefs, {field: key}).filterParams.values;
              _.each(value, (filterValue: any) => searchArray.push(queryParamValues[filterValues.indexOf(filterValue)]));
              this.searchQuery[key] = searchArray.toString();
            }

          });
          let keysNotToRemove = ['pageNo', 'rows', 'sortBy', 'sortOrder'];
          keysNotToRemove = _.uniq(_.concat(keysNotToRemove, _.keys(params.filterModel)));
          _.each(this.searchQuery, (value, key) => {
            if (_.indexOf(keysNotToRemove, key) == -1) {
              delete this.searchQuery[key];
            }
          });
        }
        if (this.isFirstLoad) {
          this.rowData = this.options.rowData.data;
          params.successCallback(this.rowData, this.options.rowData.totalRows);
          this.setDefaultGridLayout();
        }
        else {
          this.options.getData(this.searchQuery)
            .subscribe((responseData: any) => {
              this.rowData = responseData.data;
              params.successCallback(this.rowData, responseData.totalRows);
              this.setDefaultGridLayout();
            });
        }
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  private setDefaultGridLayout() {
    this.isFirstLoad = false;
    if (this.gridOptions.api) {
      this.gridOptions.api.hideOverlay();
      this.gridOptions.api.sizeColumnsToFit();
      if (!this.rowData.length) {
        this.gridOptions.api.showNoRowsOverlay();
      }
      setTimeout(() => {
        this.setDefaultGridLayout();
      });
    }
  }


}
