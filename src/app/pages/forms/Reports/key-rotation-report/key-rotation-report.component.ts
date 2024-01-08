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
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'ngx-key-rotation-report',
  templateUrl: './key-rotation-report.component.html',
  styleUrls: ['./key-rotation-report.component.scss']
})
export class KeyRotationReportComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  form!: FormGroup;
  datas: any;
  userRole:number;
  serailData:any;
  dataModel:any;
  min: Date;
  max: Date;
  animate=false;
  

  constructor(private service: ReportService,
    private storageService:StorageService,
    private router:Router,private toastrService:NbToastrService,private dialogService: NbDialogService,
    private titleService:pageTitle,protected dateService: NbDateService<Date>,private datePipe: DatePipe) { 
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
      this.userRole = this.storageService.getUser().organizationID; 
      
    }

  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>();
  title = 'Key Rotation Report';
  isValidDate:any;
  ngOnInit(): void {
    this.form = new FormGroup({
      rdsId: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate:new FormControl('',[Validators.required]),
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
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            footer: false,
            enabled:false,
            message: ()=>{
              let message = "";
              if(this.f.rdsId.value==="1"){
                message= JSON.stringify( {"From Date":this.datePipe.transform( this.f.fromDate.value, 'dd-MM-yyyy' ),
                         "To Date": this.datePipe.transform(this.f.toDate.value, 'dd-MM-yyyy'),
                        "RDsID": "OGT.AND.001" })
              }
              else if(this.f.rdsId.value==="2"){
                message=JSON.stringify( {"From Date": this.datePipe.transform( this.f.fromDate.value , 'dd-MM-yyyy' ) ,
                         "To Date": this.datePipe.transform (this.f.toDate.value ,  'dd-MM-yyyy'),
                        "RDsID": "OGT.LIN.001" })
              }

              else{
                message= JSON.stringify( {"From Date ": this.datePipe.transform( this.f.fromDate.value, 'dd-MM-yyyy' ) ,
                         "To Date": this.datePipe.transform(this.f.toDate.value, 'dd-MM-yyyy'),
                        "RDsID": "OGT.WIN.001" })

              }
              return message;
          
            },
            exportOptions: {
                 columns: [0,1,2,3,4,5,6,7,8,9]
             },
             customize:(doc)=>{
              console.log(doc)
              doc.pageMargins = [ 20, 20, 20, 20 ];
    doc.defaultStyle.fontSize = 7;
    doc.styles.tableHeader.fontSize = 7;                                               
    doc.styles.tableFooter.fontSize = 7;
  
  // Access the message text
  const message = JSON.parse(doc.content[1].text);
  console.log("Message in Customize:", message);

  // Find the index where the datatable content is added
  const datatableIndex = 1

  // Clear existing content
  doc.content.splice(1, 1);

  // Add new content based on the conditions
  doc.content.splice(datatableIndex , 0, {
    text: `From Date : ${message['From Date']}`,
    style: 'table',
    margin: [0, 0, 20, 5]
  });

  doc.content.splice(datatableIndex + 1, 0, {
    text: `To Date : ${message['To Date']}`,
    style: 'table',
    margin: [0, 0, 20, 5]
  });

  doc.content.splice(datatableIndex + 2, 0, {
    text: `RDsID : ${message['RDsID']}`,
    style: 'table',
    margin: [0, 0, 20, 5]
  });


  // Check if the content[datatableIndex] object and its body property exist before attempting to modify it
  if (doc.content[1] && doc.content[1].table && doc.content[1].table.body) {
    // Add datatable content
    const table = doc.content[datatableIndex].table;
    table.body.forEach((row) => {
      row.forEach((cell) => {
        cell.text = cell.text.toUpperCase(); // Example: Convert text to uppercase
      });
    });
  }

  // Add borders
    doc.content[4].layout = "borders";





       }
 
    
             
        },
      
      //   {
      //       extend: 'csv',
      //       footer: false,
      //       exportOptions: {
      //         columns: [0,1,2,3,4,5,6,7,8]
      //     }
           
      //   },
      //   {
      //       extend: 'excel',
      //       footer: false,
      //       exportOptions: {
      //         columns: [0,1,2,3,4,5,6,7,8]
      //     }
      //   },
      //   {
      //     extend: 'print',
      //     footer: true,
      //     exportOptions: {
      //          columns: [0,1,2,3,4,5,6,7,8]
      //      }
      // },         
     ] 
     
    };
   
    this.titleService.setTitle(this.title);
    this.getallModel();

  }

   // Get All device Model

   getallModel(){
    this.service.getModelList().subscribe({
        next: data => {
         
          if(data.status==401){
            window.sessionStorage.clear();
            //this.router.navigateByUrl('/auth/login');

            this.router.navigate([`/`], {
              skipLocationChange: true,
            });
            
          }else{
            this.dataModel = data.data;
            this.animate=true;
          }    
        },
        error: error => {
           console.error('There was an error!', error);
        }
            
    })
  }

   // Edit Register Device

   viewregisterDevice(id){
    if(id!=''){
      //this.router.navigateByUrl(`pages/forms/deviceregister/view/${id}`);
      this.router.navigate([`pages/forms/deviceregister/view/${id}`], {
        skipLocationChange: true,
      });
    }
  }

  

   /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

 


  searchreport(){

    this.form.value.fromDate = this.datePipe.transform(this.form.value.fromDate,"yyyy-MM-dd");
    this.form.value.toDate = this.datePipe.transform(this.form.value.toDate,"yyyy-MM-dd");  
    this.form.value.orgId = this.userRole;
    this.isValidDate = this.validateDates(this.form.value.fromDate, this.form.value.toDate);
    
    if(this.isValidDate){
      
        this.service.getDatebasedKeyRotationreportList(this.form.value).subscribe((data)=> {

          this.datas = data.data;
          this.rerender();
          if(this.datas.length>0){
            this.dtoptions.buttons[0].enabled=true
  
           }
          //this.dtTrigger.next(null);
          //this.dtTrigger.next();
          
          
        },
        err => {
          console.log(err.error);
          // this.storageService.clean();
          // localStorage.clear();
          // location.reload();
        })
    }  
   

  
  } 

  validateDates(sDate: string, eDate: string){
    this.isValidDate = true;
    
    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      this.showToast('danger','To date should be greater then start date.');
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

  // Print the table

  // public captureScreen()  
  // {
  //   $(".row1").hide(); 
  //   var data = document.getElementById('contentToConvert');  //Id of the table
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     let imgWidth = 208;   
  //     let pageHeight = 295;    
  //     let imgHeight = canvas.height * imgWidth / canvas.width;  
  //     let heightLeft = imgHeight;  

  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     let position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('Keyrotation-bydatewise-Report.pdf'); // Generated PDF   
  //   });
  //   $(".row1").show();   
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
