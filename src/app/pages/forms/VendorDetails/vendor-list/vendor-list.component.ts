import { Component, OnInit,OnDestroy,TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Title as pageTitle } from '@angular/platform-browser';

@Component({
  selector: 'ngx-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  datas: any;
  constructor(private service: RegisterdeviceService,private router:Router,private toastrService:NbToastrService,
    private dialogService: NbDialogService,private titleService:pageTitle) { }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  title = 'Vendor Details';
  animate=false;
  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 25,
      processing: true,
      dom: 'Bfrtip',
      columnDefs: [
        { width: '15%', targets: 1 },     // Company Name
        { width: '15%', targets: 2 },     // User Name
        { width: '30%', targets: 3 },     // Email Address
        { width: '10%', targets: 4 },     // Mobile Number
        { width: '40%', targets: 5 }      // Address (wider and allowing word wrapping)
      ],
      buttons: [
        {
            extend: 'pdf',
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            footer: true,
            exportOptions: {
                 columns: [0,1,2,3,4,5]
             }
        },
        // {
        //     extend: 'csv',
        //     footer: false,
        //     exportOptions: {
        //       columns: [0,1,2,3,4,5]
        //   }
           
        // },
        {
            extend: 'excel',
            text:'<i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL',
            footer: false,
            exportOptions: {
              columns: [0,1,2,3,4,5]
          }
        },
        {
          extend: 'print',
          text:'<i class="fa-solid fa-print"></i> PRINT',
          footer: true,
          exportOptions: {
               columns: [0,1,2,3,4,5]
           }
      },         
     ] ,
  //     'columnDefs': [ {
  //     'targets': [6], /* column index */
  //     'orderable': false, /* true or false */
  //  }],
     
    };
    this.fetchData();
    this.titleService.setTitle(this.title);
  }

  fetchData() {
    this.service.getvendorDetails().subscribe((data)=> {
      //console.log(data.data);
        this.datas = data.data;
        this.dtTrigger.next(null);
        this.animate=true
        //console.log(this.datas);
      },
     
    );

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
