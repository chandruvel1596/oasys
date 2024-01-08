import { Component, OnInit,OnDestroy,TemplateRef,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../../_services/report.service';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { StorageService } from '../../../../_services/storage.service';
import { Title as pageTitle } from '@angular/platform-browser';
import { NbDateService } from '@nebular/theme';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as internal from 'stream';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-consolidated-report',
  templateUrl: './consolidated-report.component.html',
  styleUrls: ['./consolidated-report.component.scss']
})
export class ConsolidatedReportComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  form!: FormGroup;
  datas: any;
  userRole:number;
  serailData:any;
  min: Date;
  max: Date;
  

  constructor(private service: ReportService,
    private storageService:StorageService,
    private router:Router,private toastrService:NbToastrService,private dialogService: NbDialogService,
    private titleService:pageTitle,protected dateService: NbDateService<Date>,private datePipe: DatePipe) { 
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
      this.userRole = this.storageService.getUser().roleId; 
      
    }

  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>();
  title = 'Consolidated Report';
  isValidDate:any;
  ngOnInit(): void {
    this.form = new FormGroup({
      serialNo: new FormControl('', []),
      // fromDate: new FormControl('', []),
      // toDate:new FormControl('',[]),
    });

    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 25,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
            extend: 'pdfHtml5',
            text: 'Device Details',
            footer: false,
            exportOptions: {
                 columns: [0,1,2,3,4,5,6,7,8,9]
             }
        },
        {
            extend: 'csv',
            footer: false,
            exportOptions: {
              columns: [0,1,2,3,4,5,6,7,8,9]
          }
           
        },
        {
            extend: 'excel',
            footer: false,
            exportOptions: {
              columns: [0,1,2,3,4,5,6,7,8,9]
          }
        },
        {
          extend: 'print',
          footer: true,
          exportOptions: {
               columns: [0,1,2,3,4,5,6,7,8,9]
           }
      },         
     ] 
     
    };
   
    this.titleService.setTitle(this.title);
    this.getSerialno();

  }

  getSerialno(){
    this.service.getSerialnoList().subscribe(
      (data)=> {
        this.serailData = data.data;
      },
      err => {
        console.log(err);
        // this.storageService.clean();
        // localStorage.clear();
        // location.reload();
      }     
    );
  }
  

  

   /**
   * Write code on Method
   *
   * @return response()
   */
   get f(){
    return this.form.controls;
  }

 


  // searchreport(){

  //   this.form.value.fromDate = this.datePipe.transform(this.form.value.fromDate,"yyyy-MM-dd");
  //   this.form.value.toDate = this.datePipe.transform(this.form.value.toDate,"yyyy-MM-dd");  
  //   this.form.value.orgId = this.userRole;
  //   this.isValidDate = this.validateDates(this.form.value.fromDate, this.form.value.toDate);
    
  //   if(this.isValidDate){
      
  //       this.service.getConsolidatedreportList(this.form.value).subscribe((data)=> {

  //         this.datas = data.data;
  //         this.rerender();
         
          
  //       },
  //       err => {
  //         console.log(err.error);
  //         // this.storageService.clean();
  //         // localStorage.clear();
  //         // location.reload();
  //       })
  //   }  
   

  
  // } 

  searchreport(){
     this.form.value.id = this.userRole;
      this.service.getConsolidatedreportList(this.form.value).subscribe((data)=> {
        this.datas = data.data;
        this.rerender();
        
      },
      err => {
        console.log(err.error);
        // this.storageService.clean();
        // localStorage.clear();
        // location.reload();
      })  
  } 

  validateDates(sDate: string, eDate: string){
    this.isValidDate = true;
    
    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      this.showToast('danger','To date should be grater then start date.');
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

   // Show Toaster with Common
   showToast(status: NbComponentStatus,message) {
    return this.toastrService.show(status, `${message}`, { status });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
    });
  }  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
