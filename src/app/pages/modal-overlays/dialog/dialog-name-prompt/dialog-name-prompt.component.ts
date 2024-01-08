import { Component,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {
  myForm!: FormGroup;
  @Input() title: string;
  @Input() deviceId: string;
  loading = false;
  bioSection = new FormGroup({
    name: new FormControl('')
   
  });
  // fetchdata:any[]=[]
  // deviceRegister:deviceRegisterRequest={
  //   deviceModelId: 0,
  //   serialNo: '',
  //   activeStatus: 0,
  //   remarks: '',
  //   serverEnvironmentId: 0,
  //   id: 0,
  //   deviceId: ''
  // }
  // datafile:any;
  // dataServerenvironment: any;
  // enablebutton:boolean=true
  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>,private service: RegisterdeviceService,private router:Router,private toastrService:NbToastrService) {
   
   
  }
  ngOnInit(): void {
    //console.log('here is your title: ', this.title); // displays 'Hello world'
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
     
    });
    // this.fetchData()
    // this.getallServerEnvironment();
    // if(this.datafile && this.deviceRegister.deviceModelId && this.deviceRegister.serverEnvironmentId ){
    //   this.enablebutton=false

    // }
  }
  cancel() {
    this.ref.close();
  }

   // Show Toaster with Common
   showToast(status: NbComponentStatus,message) {
    this.toastrService.show(status, `${message}`, { status });
  }

  submit(name) {
    
    if(this.title!='' && this.deviceId !=''){
      
      this.loading = true;

      if(name!=''){
        this.service.otp_verify(this.title,name).subscribe(
          (res:any) => {
         
          if(res.message=='Not-Verified'){
            this.loading = false;
             // this.showToast('warning',res.message);
             this.showToast('warning',res.message);
          }else if(res){
            this.showToast('success','OTP Verified Successfully');
            
            this.service.deregister(this.title,this.deviceId).subscribe(
              (res:any) => {
              this.loading = false;
              if(res.message==''){
                 // this.showToast('warning',res.message);
                 this.showToast('warning',res.message);
              }else{
                this.showToast('success','Device DeRegistered Successfully');
               
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                    return false;
                }
               this.router.onSameUrlNavigation = 'reload';
               this.router.navigate([`pages/forms/deviceregisterList`], {
                  skipLocationChange: true,
                  queryParams: { index: 1 }
                });
              }
            },
            err => {
              this.showToast('warning',err.error);  
              this.ref.close();
            }) 
          }
        },
        err => {
          this.showToast('warning',err.error);  
          this.ref.close();
        })
      }
     
    }
  }

  get f(){
    return this.myForm.controls;
  }

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
// fetchData(){
//   this.service.getallModel()
//   .subscribe({
//     next: data => {
         
//       if(data.status==401){
//         window.sessionStorage.clear();
//         //this.router.navigateByUrl('/auth/login');

//         this.router.navigate([`/`], {
//           skipLocationChange: true,
//         });
        
//       }else{
//         this.fetchdata = data.data;
//          console.log("make",data.data)
//       }    
//     },
//     error: error => {
//        console.error('There was an error!', error);
//     }
    
//   })

// }
// getallServerEnvironment(){
//   this.service.getallServerEnvironment().subscribe({
//       next: data => {
//         if(data.status==401){
//           window.sessionStorage.clear();
//           //this.router.navigateByUrl('/auth/login');
//           this.router.navigate([`/`], {
//             skipLocationChange: true,
//           });
//         }else{
//           console.log("serverenvironment",data.data);
//           this.dataServerenvironment = data.data;
//         }    
//       },
//       error: error => {
//          console.error('There was an error!', error);
//       }
          
//   })
// }

// make_model(deviceid:number,id:number){
//   this.deviceRegister.deviceModelId=deviceid;
//   this.deviceRegister.id=id
//   console.log(this.deviceRegister)
// }

// getFileDetails(event){
//   this.datafile=event.target.files[0]
//   console.log(event.target.files[0])
// }

// serverenvironment(e){
//   this.deviceRegister.serverEnvironmentId=e.id
//   console.log(e.target.value)
// }

// upload(){
//   const formdata=new FormData()
//   formdata.append("file",this.datafile)
//   formdata.append("body",JSON.stringify(this.deviceRegister))
//   this.service.fileUpload(formdata)
//   .subscribe(res=>console.log(res))
// }


}
