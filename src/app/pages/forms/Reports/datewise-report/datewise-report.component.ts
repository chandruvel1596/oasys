import { Component, OnInit,OnDestroy,ElementRef,TemplateRef,ViewChild } from '@angular/core';
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
import { ExportService } from '../../../../_services/export.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 


@Component({
  selector: 'ngx-datewise-report',
  templateUrl: './datewise-report.component.html',
  styleUrls: ['./datewise-report.component.scss']
})
export class DatewiseReportComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  form!: FormGroup;
  datas: any;
  userRole:number;
  serailData:any;
  modelData:any;
  statusData:any;
  min: Date;
  max: Date;
  currentDateTime:any;
  animate=false;

  constructor(private service: ReportService,
    private storageService:StorageService,
    private router:Router,private toastrService:NbToastrService,private dialogService: NbDialogService,
    private titleService:pageTitle,protected dateService: NbDateService<Date>,private datePipe: DatePipe,
    private exportService:ExportService) {

      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
      this.userRole = this.storageService.getUser().organizationID; 
      this.currentDateTime =this.datePipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
      
    }

  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>();
  title = 'List of devices by Date wise';
  isValidDate:any;
  ngOnInit(): void {
    this.form = new FormGroup({
      rdsId: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate:new FormControl('',[Validators.required]),
      registeredDeviceStatus:new FormControl('',[Validators.required]),
      orgId:new FormControl(this.userRole)
    });

    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 1000,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            footer: false,
            enabled:false,
            exportOptions: {
                 columns: [0,1,2,3,4,5,6,7,8,9]
             },
             message: ()=>{
              let message = "";
              const deviceStatus=(this.f.registeredDeviceStatus.value==="1"?"Registered":"De-Registered")
              if(this.f.rdsId.value==="1"){
                message= JSON.stringify( {"From Date":this.datePipe.transform( this.f.fromDate.value, 'dd-MM-yyyy' ),
                         "To Date": this.datePipe.transform(this.f.toDate.value, 'dd-MM-yyyy'),
                        "RDsID": "OGT.AND.001",
                      "Status" :deviceStatus})
              }
              else if(this.f.rdsId.value==="2"){
                message=JSON.stringify( {"From Date": this.datePipe.transform( this.f.fromDate.value , 'dd-MM-yyyy' ) ,
                         "To Date": this.datePipe.transform (this.f.toDate.value ,  'dd-MM-yyyy'),
                        "RDsID": "OGT.LIN.001",
                        "Status" :deviceStatus })
              }

              else{
                message= JSON.stringify( {"From Date ": this.datePipe.transform( this.f.fromDate.value, 'dd-MM-yyyy' ) ,
                         "To Date": this.datePipe.transform(this.f.toDate.value, 'dd-MM-yyyy'),
                        "RDsID": "OGT.WIN.001",
                        "Status" :deviceStatus })

              }
              return message;
          
            },
            customize:(doc:any)=>{
              console.log(doc)
              doc.pageMargins = [ 20, 20, 20, 20 ];
    doc.defaultStyle.fontSize = 7;
    doc.styles.tableHeader.fontSize = 7;                                               
    doc.styles.tableFooter.fontSize = 7;
    const additionalTable = {
      headerRows: 1, // Define the number of header rows based on the provided content
      body: [
        [{'text':'Organization Name'},{'text':this.datas[0].companyName} ,{'text':'RDsID'}, {'text':this.datas[0].rdsId}],
        [{'text':'Modality Name'}, {'text':this.datas[0].modalityName},{'text':'DPID'}, {'text':this.datas[0].dpId}],
        [{'text':'Model Name'}, {'text':this.datas[0].modelName},{'text':'Version'}, {'text':this.datas[0].version}],
        [{'text':'UIDAI Environment Status'}, {'text':this.datas[0].activeStatus},{'text':'Level of Compliance'}, {'text':this.datas[0].levelOfComplaince}],
        // Add more rows as needed
      ]
    };
  
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

  doc.content.splice(datatableIndex + 3, 0, {
    text: `Status : ${message['Status']}`,
    style: 'table',
    margin: [0, 0, 20, 5]
  });

  doc.content.splice(datatableIndex + 4, 0, {
    table: additionalTable,
    layout: 'borders',
    margin: [300, -55, 20, 5]
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
    doc.content[6].layout = "borders";
    // const body=doc.content[5].table.body
    // console.log('5',body)
    // console.log('5a',body[0])
    // const body1=doc.content[6].table.body
    // console.log('6',body1)
    // console.log('6a',body1[0])
    doc.content[5].table.body[0][0]['bold']= true
    doc.content[5].table.body[0][0].fillColor= '#EEEEEE'
    doc.content[5].table.body[0][2]['bold']= true
    doc.content[5].table.body[0][2].fillColor= '#EEEEEE'
    doc.content[5].table.body[1][0]['bold']= true
    doc.content[5].table.body[1][0].fillColor= '#EEEEEE'
    doc.content[5].table.body[1][2]['bold']= true
    doc.content[5].table.body[1][2].fillColor= '#EEEEEE'
    doc.content[5].table.body[2][0]['bold']= true
    doc.content[5].table.body[2][0].fillColor= '#EEEEEE'
    doc.content[5].table.body[2][2]['bold']= true
    doc.content[5].table.body[2][2].fillColor= '#EEEEEE'
    doc.content[5].table.body[3][0]['bold']= true
    doc.content[5].table.body[3][0].fillColor= '#EEEEEE'
    doc.content[5].table.body[3][2]['bold']= true
    doc.content[5].table.body[3][2].fillColor= '#EEEEEE'

    // doc.content[5].table.body[0][0]['style']= 'tableHeader'
    // doc.content[5].table.body[0][0].fillColor= '#C5DFF8'
    // doc.content[5].table.body[0][2]['style']= 'tableHeader'
    // doc.content[5].table.body[0][2].fillColor= '#C5DFF8'
    // doc.content[5].table.body[1][0]['style']= 'tableHeader'
    // doc.content[5].table.body[1][0].fillColor= '#C5DFF8'
    // doc.content[5].table.body[1][2]['style']= 'tableHeader'
    // doc.content[5].table.body[1][2].fillColor= '#C5DFF8'
    // doc.content[5].table.body[2][0]['style']= 'tableHeader'
    // doc.content[5].table.body[2][0].fillColor= '#C5DFF8'
    // doc.content[5].table.body[2][2]['style']= 'tableHeader'
    // doc.content[5].table.body[2][2].fillColor= '#C5DFF8'
    // doc.content[5].table.body[3][0]['style']= 'tableHeader'
    // doc.content[5].table.body[3][0].fillColor= '#C5DFF8'
    // doc.content[5].table.body[3][2]['style']= 'tableHeader'
    // doc.content[5].table.body[3][2].fillColor= '#C5DFF8'





       }
        },
        // {
        //     extend: 'csv',
        //     footer: false,
        //     exportOptions: {
        //       columns: [0,1,2,3,4,5,6,7,8]
        //   }
           
        // },
        // {
        //     extend: 'excel',
        //     footer: false,
        //     exportOptions: {
        //       columns: [0,1,2,3,4,5,6,7,8]
        //   }
        // },
      //   {
      //     extend: 'print',
      //     footer: true,
      //     exportOptions: {
      //          columns: [0,1,2,3,4,5,6,7,8]
      //      }
      // },         
     ],
      


     
    };
   
    this.titleService.setTitle(this.title);
    this.getallModels();
    this.getallStatus();
    
  }

  getallModels(){
    this.service.getModelList().subscribe(
      (data)=> {
        this.modelData = data.data;
        this.animate=true
      },
      err => {
        console.log(err);
        // this.storageService.clean();
        // localStorage.clear();
        // location.reload();
      }     
    );
  }

  getallStatus(){
    this.service.getallStatus().subscribe(
      (data)=> {
        this.statusData = data.data;
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
     //this.form.value.id = this.userRole;
     this.form.value.fromDate = this.datePipe.transform(this.form.value.fromDate,"yyyy-MM-dd");
     this.form.value.toDate = this.datePipe.transform(this.form.value.toDate,"yyyy-MM-dd");  
      this.service.getConsolidatedreportList(this.form.value).subscribe((data)=> {
        this.datas = data.data;
      
        this.rerender();
        if(this.datas?.length>0){
          this.dtoptions.buttons[0].enabled=true

         }

         else{

          this.dtoptions.buttons[0].enabled=false

         }
        // setTimeout(()=>{                          
        //     $(".dt-buttons").css({"visibility": "hidden"}); 
        // }, 300);
        // $("#target").show();
        
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

  printPage() {
    window.print();
  }
  
  export() {
    this.exportService.exportExcel(this.datas, 'Date-wise-Report');
  }

  public captureScreen()  
  {  
    $('.row1').hide(); 
    const data = document.getElementById('contentToConvert');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      const imgWidth = 220;   
      const pageHeight = 295;    
      const imgHeight = canvas.height * imgWidth / canvas.width;  
      const heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      const position = 8;  
      pdf.addImage(contentDataURL, 'PNG', 8, position, imgWidth - 24, imgHeight - 24)  
      pdf.save('Date-wise-Report.pdf'); // Generated PDF   
    });  
    $('.row1').show();
  }  

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
