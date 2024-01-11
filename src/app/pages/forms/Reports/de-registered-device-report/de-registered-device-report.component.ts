import { Component, OnInit,OnDestroy,TemplateRef,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../../_services/report.service';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { StorageService } from '../../../../_services/storage.service';
import { Title as pageTitle } from '@angular/platform-browser';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import { event } from 'jquery';

@Component({
  selector: 'ngx-de-registered-device-report',
  templateUrl: './de-registered-device-report.component.html',
  styleUrls: ['./de-registered-device-report.component.scss']
})
export class DeRegisteredDeviceReportComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  form!: FormGroup;
  datas: any[]=[];
  dataModel:any;
  userRole:number;
  animate=false;

  constructor(private service: ReportService,
    private storageService:StorageService,
    private router:Router,private toastrService:NbToastrService,private dialogService: NbDialogService,private titleService:pageTitle) {
      this.userRole = this.storageService.getUser().organizationID;
     }

  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>();
  title = 'DeRegistered Device Details';
  ngOnInit(): void {
    this.form = new FormGroup({
      rdsId: new FormControl('', Validators.required),
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
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            footer: false,
            message: ()=>{
              if(this.f.rdsId.value==="1"){
                return "RDsID : OGT.AND.001 "
              }
              else if(this.f.rdsId.value==="2"){
                return "RDsID : OGT.LIN.001 "
              }

              else{
                return "RDsID : OGT.WIN.001"
              }
          

            },
            enabled:false,
            exportOptions: {
                 columns: [0,1,2,3,4,5,6,7]
             },
             customize:(doc:any)=>{
              console.log(doc)
              doc.pageMargins = [ 20, 20, 20, 20 ];
    doc.defaultStyle.fontSize = 7;
    doc.styles.tableHeader.fontSize = 7;                                               
    doc.styles.tableFooter.fontSize = 7;
    doc.content[2].layout = "borders";
  } 

             
        },
 
      //   {
      //       extend: 'csv',
      //       footer: false,
      //       exportOptions: {
      //         columns: [0,1,2,3,4,5,6,7]
      //     }
           
      //   },
      //   {
      //       extend: 'excel',
      //       footer: false,
      //       exportOptions: {
      //         columns: [0,1,2,3,4,5,6,7]
      //     }
      //   },
      //   {
      //     extend: 'print',
      //     footer: true,
      //     exportOptions: {
      //          columns: [0,1,2,3,4,5,6,7]
      //      }
      // },         
     ] 
     
    };
    //this.fetchData();
    this.getallModel();
    this.titleService.setTitle(this.title);
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


  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
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

  searchreport(){
    this.form.value.id = this.userRole;
    this.service.getdeRegisteredDeviceReportList(this.form.value).subscribe(
      (data)=> {
        
        this.datas = data.data;
        this.rerender();
        if(this.datas.length>0){
          this.dtoptions.buttons[0].enabled=true
          // const rds=this.f.rdsId.value==="1"?"OGT.AND.001":"OGT.AND.002"
          // this.dtoptions.buttons[0].messageTop="RdsID : "+rds

         }
      },
      err => {
        this.storageService.clean();
        localStorage.clear();
        location.reload();
      }
     
    );
  }
  public captureScreen()  
  { 
    $('.row1').hide();  
    const data = document.getElementById('contentToConvert');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      const imgWidth = 208;   
      const pageHeight = 295;    
      const imgHeight = canvas.height * imgWidth / canvas.width;  
      const heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      const position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('DeRegistered-device-details-Report.pdf'); // Generated PDF   
    });  
    $('.row1').show(); 
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
