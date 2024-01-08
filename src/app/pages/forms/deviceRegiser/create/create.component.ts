import { Component, OnInit } from '@angular/core';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { Title as pageTitle } from '@angular/platform-browser';
@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [DatePipe]
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  currentDateTime:any;
  access_token:any;
  dataModel: any;
  dataStatus:any;
  dataServerenvironment:any;
  title = 'Add Device Detail';
  constructor(public registerdeviceService:RegisterdeviceService,private router:Router,public datepipe: DatePipe,
    private toastrService:NbToastrService,private titleService:pageTitle) {
    this.currentDateTime =this.datepipe.transform((new Date), 'dd-MM-yyyy H:mm:ss');
   }

  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token');
    this.form = new FormGroup({
      deviceModelId: new FormControl('', [Validators.required]),
      serialNo: new FormControl('', [Validators.required,Validators.maxLength(15)]),
      activeStatus: new FormControl('1', Validators.required),
      remarks: new FormControl('',[Validators.maxLength(50)]),
      serverEnvironmentId:new FormControl('',Validators.required),
    });
    this.getallModel();
    this.getActiveStatus();
    this.getallServerEnvironment();
    this.titleService.setTitle(this.title);
  }

   /**
   * Write code on Method
   *
   * @return response()
   */
   get f(){
    return this.form.controls;
  }

  // Get All device Model

  getallModel(){
    this.registerdeviceService.getallModel().subscribe({
        next: data => {
         
          if(data.status==401){
            window.sessionStorage.clear();
            //this.router.navigateByUrl('/auth/login');

            this.router.navigate([`/`], {
              skipLocationChange: true,
            });
            
          }else{
            this.dataModel = data.data;
          }    
        },
        error: error => {
           console.error('There was an error!', error);
        }
            
    })
  }

  // Get All device Status

  getActiveStatus(){
    this.registerdeviceService.getActiveStatus().subscribe({
        next: data => {
         
          if(data.status==401){
            window.sessionStorage.clear();
            //this.router.navigateByUrl('/auth/login');
            this.router.navigate([`/`], {
              skipLocationChange: true,
            });
          }else{
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

  getallServerEnvironment(){
    this.registerdeviceService.getallServerEnvironment().subscribe({
        next: data => {
          if(data.status==401){
            window.sessionStorage.clear();
            //this.router.navigateByUrl('/auth/login');
            this.router.navigate([`/`], {
              skipLocationChange: true,
            });
          }else{
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


  submitDetails(){
    this.registerdeviceService.create(this.form.value).subscribe((res:any) => {
       
         if(res.message!='Success'){
          this.showToast('warning',res.message);
         }else if(res){
         
          this.showToast('success','Device Detail Added successfully');
          //this.router.navigateByUrl('pages/forms/deviceregisterList');
          this.router.navigate([`pages/forms/deviceregisterList`], {
            skipLocationChange: true,
          });
         }else{

         }
         
    })
  }
 
  // Cancel the page

  cancel(){
    this.router.navigate([`pages/forms/deviceregisterList`], {
      skipLocationChange: true,
    });
  }

  // Show Toaster with Common
  showToast(status: NbComponentStatus,message) {
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
}
