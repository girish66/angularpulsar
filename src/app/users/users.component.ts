import {Component, Inject, LOCALE_ID, NgZone, OnInit} from "@angular/core";
import {formatDate} from '@angular/common';
import {Router, ActivatedRoute} from "@angular/router";
import {map, first, switchMap} from "rxjs/operators";
import {Grid, GridOptions, RowNode} from "ag-grid-community";
import {User} from "../_models";
import {GraphqlService} from "../_services";

@Component({
  selector: "app-grid",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent {
  apiUsers: User[] = [];
  frameworkComponents: any;
  columnDefs = [
    {headerName: "Id", field: "id", sortable: false, filter: true, hide: true},
    {headerName: "First Name", field: "firstName"},
    {headerName: "Last Name", field: "lastName"},
    {headerName: "Email", field: "email"},
    {
      headerName: "Phone", field: "phoneNumber", cellRenderer: (data: any) => { //Filter only numbers from the input
        const cleaned = ('' + data.value).replace(/\D/g, '');
        //Check if the input is of correct length
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        ;
        return data.value;
      }
    },
    {
      headerName: "Created", field: "createdAt", filter: false, cellRenderer: (data: any) => {
        if (data && data.value)
          return formatDate(data.value, 'MM/dd/yyyy', this.locale);
        return "";
      }
    },
    {
      headerName: "Changed", field: "changedOn", filter: false, cellRenderer: (data: any) => {
        if (data && data.value)
          return formatDate(data.value, 'MM/dd/yyyy', this.locale);
        return "";
      }, hide: true
    },
  ];

  gridOptions: GridOptions = {
    // enable sorting on all columns by default
    defaultColDef: {
      sortable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
    },
    rowSelection: "single",
    rowHeight: 40,
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function (params) {
      return `[${params.value.toLocaleString()}]`;
    },
    pivotPanelShow: "always",
    enableRangeSelection: true,
  };

  constructor(private router: Router, @Inject(LOCALE_ID) private locale: string, private zone: NgZone, private graphqlService: GraphqlService) {
    this.graphqlService
      .Users()
      .pipe(first())
      .subscribe((users: User[]) => {
        //console.log(JSON.stringify(users));
        this.apiUsers = users;
      });
  }

  formatPhoneNumber(data: string) {
    console.log(data);
    //Filter only numbers from the input
    const cleaned = ('' + data).replace(/\D/g, '');
    //Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    ;
    return 'ABC';
  }
}
