import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title as pageTitle } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-bulkdetail',
  templateUrl: './bulkdetail.component.html',
  styleUrls: ['./bulkdetail.component.scss'],
  providers: [DatePipe]
})
export class BulkdetailComponent implements OnInit {
  form!: FormGroup;
  currentDateTime: any;
  access_token: any;
  dataModel: any;
  dataStatus: any;
  datafile: any;
  invalidtype = false;
  fileuploaded = true;
  dataServerenvironment: any;
  title = 'Bulk Device Detail';
  failuredata:any[];
  successdata:any[];
  swap=false
  @ViewChild('myInput')
myInputVariable: ElementRef;
  constructor(public registerdeviceService: RegisterdeviceService, private router: Router, public datepipe: DatePipe,
    private toastrService: NbToastrService, private titleService: pageTitle,private elementRef:ElementRef) {
    this.currentDateTime = this.datepipe.transform((new Date), 'dd-MM-yyyy H:mm:ss');
  }

  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token');
    this.form = new FormGroup({
      deviceModelId: new FormControl('', [Validators.required]),
      activeStatus: new FormControl('1', Validators.required),
      remarks: new FormControl('', [Validators.maxLength(50)]),
      serverEnvironmentId: new FormControl('', Validators.required),

    });
    
    this.getallModel();
    this.getActiveStatus();
    this.getallServerEnvironment();
    this.titleService.setTitle(this.title);
    // this.dtoptions={
    //   destroy:true,
    // }
   }
  
  

  /**
  * Write code on Method
  *
  * @return response()
  */
  get f() {
    return this.form.controls;
  }

  // Get All device Model

  getallModel() {
    this.registerdeviceService.getallModel().subscribe({
      next: data => {

        if (data.status == 401) {
          window.sessionStorage.clear();
          //this.router.navigateByUrl('/auth/login');

          this.router.navigate([`/`], {
            skipLocationChange: true,
          });

        } else {
          this.dataModel = data.data;
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }

    })
  }

  // Get All device Status

  getActiveStatus() {
    this.registerdeviceService.getActiveStatus().subscribe({
      next: data => {

        if (data.status == 401) {
          window.sessionStorage.clear();
          //this.router.navigateByUrl('/auth/login');
          this.router.navigate([`/`], {
            skipLocationChange: true,
          });
        } else {
          //console.log(data.data);
          this.dataStatus = data.data.sort();
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }

    })
  }

  // Get All Server Environment Model

  getallServerEnvironment() {
    this.registerdeviceService.getallServerEnvironment().subscribe({
      next: data => {
        if (data.status == 401) {
          window.sessionStorage.clear();
          //this.router.navigateByUrl('/auth/login');
          this.router.navigate([`/`], {
            skipLocationChange: true,
          });
        } else {
          //console.log(data.data);
          this.dataServerenvironment = data.data;
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


  submitDetails() {


    // formdata.append("activeStatus",this.f.activeStatus.value);
    // formdata.append("remarks",this.f.remarks.value);
    // formdata.append("serverEnvironmentId",this.f.serverEnvironmentId.value);
   

    


    this.registerdeviceService.fileUpload(this.datafile, this.form.value).subscribe((res: any) => {

      if (res.FailureData.length===0) {
        this.showToast('success', 'Device Details Added successfully');
        //this.router.navigateByUrl('pages/forms/deviceregisterList');
        this.router.navigate([`pages/forms/deviceregisterList`], {
          skipLocationChange: true,
        });
        
      } else if (res.SuccessData.length===0) {
        this.showToast('warning', "this devices are already uploaded");
        this.failuredata=res.FailureData;

        
      } else if(res.SuccessData.length!==0 && res.FailureData.length!==0){
        this.showToast('warning', "the devices are partially uploaded");
        this.failuredata=res.FailureData;
        this.successdata=res.SuccessData

  
 }
 else {
  return
 }
 this.myInputVariable.nativeElement.value = "";
 this.fileuploaded = true

    })
  }

  // Cancel the page

  cancel() {
    this.router.navigate([`pages/forms/deviceregisterList`], {
      skipLocationChange: true,
    });
  }

  // Show Toaster with Common
  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(status, `${message}`, { status });
  }

  // Omit Special character

  // omit_special_char(event)
  // {   
  //   var k;  
  //   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  //   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  // }

  public omit_special_char(e: any) {
    try {
      let k;
      if (/^[a-zA-Z0-9\s]*$/.test(e.key)) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    } catch (e) {
    }
  }

  public omit_special_char2(e: any) {
    try {
      let k;
      if (/^[a-zA-Z0-9.,\s]*$/.test(e.key)) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    } catch (e) {
    }
  }

  getFileDetails(e) {
    this.swap=false
    this.failuredata=null
    const datafile = e.target.files[0]
    const filetype = ['xls', 'xlsx', '.xlsm', 'xlsb', 'csv']

    if (datafile) {
      const filename = datafile.name.split('.').pop() || ''
      if (filetype.includes(filename)) {
        this.datafile = datafile
        this.fileuploaded = false
        this.invalidtype = false
      }
      else {
        this.invalidtype = true
        this.fileuploaded = true
      }
    }
    else { return }

  }

  downloadsamplefile(): void {
    const excelFilePath = '/assets/samplefile/samplefile.xlsx';
    const link = document.createElement('a');
    link.href = excelFilePath;
    link.download = 'samplefile.xlsx'
    link.click();
  }

  failureDetails(){
    if(!this.swap){
    
    const successdata=this.successdata?.map(s=>({...s,status:'Success'})) || []
    const failuredata=this.failuredata?.map(f=>({...f,status:'Failed'})) || []
    const mergedata=[...successdata,...failuredata]
    const exceldata=mergedata.map(item=>({
      SeriolNo: item.serialNo,
      Status:item.status,
    }))

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a = this.elementRef.nativeElement.appendChild(document.createElement('a'));
    a.href = window.URL.createObjectURL(data);
    a.download = 'DeviceStatus.xlsx';
    a.style.display = 'none';
    a.click();
    this.elementRef.nativeElement.removeChild(a);
    this.swap=true
  }
}
}


