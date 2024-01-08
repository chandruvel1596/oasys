import { Component, OnInit,OnDestroy,TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Title as pageTitle } from '@angular/platform-browser';

@Component({
  selector: 'ngx-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  datas: any;
  constructor(private service: RegisterdeviceService,private router:Router,private toastrService:NbToastrService,
    private dialogService: NbDialogService,private titleService:pageTitle) { }
  //dtoptions: DataTables.Settings = {};
  dtoptions: DataTables.Settings = {};
  title = 'Model Details';  
  dtTrigger:Subject<any>=new Subject<any>();
  animate=false;
  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 25,
      processing: true,
      dom: 'Bfrtip',
      columnDefs: [
        { width: '20%', targets: 1 },  
        { width: '15%', targets: 2 },   
        { width: '15%', targets: 3 },   
        { width: '15%', targets: 4 },   
        { width: '30%', targets: 5 }    
      ],
      buttons: [
        {
            extend: 'pdf',
            footer: true,
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
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
    this.service.getallModel().subscribe((data)=> {
      //console.log(data.data);
        this.datas = data.data;
        this.dtTrigger.next(null);
        this.animate=true
        //console.log(this.datas);
      },
     
    );

  }

  viewmodelDetail(id){
    if(id!=''){
      //this.router.navigateByUrl(`pages/forms/deviceregister/view/${id}`);
      this.router.navigate([`pages/forms/Modeldetails/view/${id}`], {
        skipLocationChange: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
