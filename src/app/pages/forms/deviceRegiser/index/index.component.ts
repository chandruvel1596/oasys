import { Component, OnInit,OnDestroy,TemplateRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { StorageService } from '../../../../_services/storage.service';
import { Title as pageTitle } from '@angular/platform-browser';
import { DashboardService } from '../../../../_services/dashboard.service';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  datas: any;
  registered:any;
  notRegistered:any;
  deRegistered:any;;
  constructor(private service: RegisterdeviceService,
    private storageService:StorageService,
    private router:Router,private toastrService:NbToastrService,private dialogService: NbDialogService,private titleService:pageTitle,
    private dashboardservice:DashboardService) {

      //count for not registered,registered and Deregistered

  this.dashboardservice.getallDashboardCount().subscribe(
    (data)=> {
      this.registered=data.totalRegisterdDevicesUidai;
      this.deRegistered=data.totalDeRegisterdDevicesUidai;
      this.notRegistered=data.totalActiveDevices;
    })
     
  }
 
  //dtoptions: DataTables.Settings = {};
  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>();
  title = 'Device Details';
  animate=false;
  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 25,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        
       
        {
            extend: 'excel',
            text:'<i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL',
            footer: false,
            exportOptions: {
              columns: [0,1,2,3,4,5,6]
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
      {
        extend: 'pdfHtml5',
        text: '<i class="fa fa-file-pdf-o"></i> PDF',
        footer: false,
        exportOptions: {
             columns: [0,1,2,3,4,5,6]
         }
    },        
     ] ,
  //     'columnDefs': [ {
  //       'targets': [6], /* column index */
  //       'width': '40%',
  //       'orderable': false, /* true or false */
  //    },{
  //     'targets': [8], /* column index */
  //     'orderable': false, /* true or false */
  //  }],
     
    };
    this.fetchData();
    this.titleService.setTitle(this.title);
  }
  fetchData() {
    this.service.getallDeviceRegisterList().subscribe(
      (data)=> {
        this.datas = data.data;
        this.dtTrigger.next(null);
        this.animate=true
      },
      err => {
        // this.storageService.clean();
        // localStorage.clear();
        
        // location.reload();
      }
     
    );

  }

  // Register Device

  registerDevice(){
    //this.router.navigateByUrl('pages/forms/deviceregisterAdd');
    this.router.navigate([`pages/forms/deviceregisterList/deviceregisterAdd`], {
      skipLocationChange: true,
    });
  }

  bulkdevice(){
    this.router.navigate([`pages/forms/deviceregisterList/bulkdetail`], {
      skipLocationChange: true,
    });

  }
  
  



  // Edit Register Device

  editregisterDevice(id){
    if(id!=''){
      //this.router.navigateByUrl(`pages/forms/deviceregister/edit/${id}`);
      this.router.navigate([`pages/forms/deviceregisterList/edit/${id}`], {
        skipLocationChange: true,
      });
    }
  }

  // Edit Register Device

  viewregisterDevice(id){
    if(id!=''){
      //this.router.navigateByUrl(`pages/forms/deviceregister/view/${id}`);
      this.router.navigate([`pages/forms/deviceregisterList/view/${id}`], {
        skipLocationChange: true,
      });
    }
  }

  
  // DeRegister Device

  deregisterDevice(serialNo){
    if(serialNo!=''){
      this.service.deregister(serialNo,'').subscribe((res:any) => {
        if(res.message!=''){
           this.showToast('success','Device DeRegistered Successfully');
           //this.router.navigateByUrl('pages/forms/deviceregisterList');
           this.router.navigate([`pages/forms/deviceregisterList`], {
            skipLocationChange: true,
          });
        }else if(res){
          this.showToast('success','Device DeRegistered Successfully');
          //this.router.navigateByUrl('pages/forms/deviceregisterList');
          this.router.navigate([`pages/forms/deviceregisterList`], {
            skipLocationChange: true,
          });
        }else{

        }
      })
    }
  }

  // Show Toaster with Common
  showToast(status: NbComponentStatus,message) {
    this.toastrService.show(status, `${message}`, { status });
  }

  clickMethod(name: string,deviceId: string) {

    const dialogRef = this.dialogService.open(DialogNamePromptComponent, {
      context: { title: name,deviceId: deviceId},
      autoFocus: false 
    });
    dialogRef.onClose.subscribe((resp) => {
      console.log(`dialog closed`);
      //console.log(resp);
    });

    // if(confirm("Are you sure you want DeRegister this Device"+name+"?")) {
    //   this.deregisterDevice(name);
    // }
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // open3() {
  //   const dialogRef = this.dialogService.open(DialogNamePromptComponent, {
  //     context: { title: 'Hello world'},
  //   });
  //   dialogRef.onClose.subscribe((resp) => {
  //     console.log(`dialog closed`);
  //     console.log(resp);
  //   });

  // }
  open3() {
    const dialogRef = this.dialogService.open(DialogNamePromptComponent, {
      context: { title: 'Hello world'},
    });
    dialogRef.onClose.subscribe((resp) => {
      console.log(`dialog closed`);
      console.log(resp);
    });

  }
//   @HostListener('window:scroll', ['$event'])
// onWindowScroll(event: Event) {

//   console.log(event)
//   // Your scroll event handling logic here
// }
}
