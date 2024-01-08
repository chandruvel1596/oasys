import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../_services/report.service';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-mc-config',
  templateUrl: './mc-config.component.html',
  styleUrls: ['./mc-config.component.scss']
})
export class McConfigComponent implements OnInit {
  Mcform:any;
  roleid=localStorage.getItem('userRole');
  maxDays: number;
  animate=false;
  dataModel:any
  dataStatus: any;
  dataServerenvironment: any;


  constructor(private service: ReportService,public registerdeviceService: RegisterdeviceService, private router: Router,private fb:FormBuilder,
    private toastrService: NbToastrService) { 
     
    }

  ngOnInit(): void {
    this.Mcform=this.fb.group({
      organizationId:[this.roleid,Validators.required],
      modality:['',Validators.required],
      activeStatus: ['1',Validators.required],
      environmentServerId: ['',Validators.required],
      modelId: ['',Validators.required],
      noOfDays: ['',Validators.required]
  })

  this.Mcform.get('modality').valueChanges.subscribe((selectedValue) => {
    this.updateMaxDays(selectedValue);
  })

  this.getActiveStatus();
  this.getallServerEnvironment();
  this.getallModel();

}

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
        this.animate=true
      }
    },
    error: error => {
      console.error('There was an error!', error);
    }

  })
}
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
          this.animate=true
        }    
      },
      error: error => {
         console.error('There was an error!', error);
      }
          
  })
}  


get m() {
  return this.Mcform.controls;
}
showToast(status: NbComponentStatus, message) {
  this.toastrService.show(status, `${message}`, { status });
}

McSubmit(){
  const form={...this.Mcform.value}
  delete form.modality
  this.registerdeviceService.MCconfig(form)
  .subscribe((res:any)=>{
    console.log(res)
    if (res.Message==="Mc Successfully Updated"){
      this.showToast('success', `${res.Message}`)
      this.Mcform.reset()
 }
 else{
    this.showToast('danger', "MC not updated");

 }
  })
  console.log(this.Mcform.value)
}

resetMcform(){
  this.Mcform.reset()
  this.Mcform.get('activeStatus').setValue('1');
}

updateMaxDays(selectedValue) {
  console.log('activate')
  if (selectedValue === 'L0') {
    this.m.noOfDays.setValidators([Validators.required, Validators.min(1), Validators.max(30)]);
    this.maxDays=30
  } else if (selectedValue === 'L1') {
    this.m.noOfDays.setValidators([Validators.required, Validators.min(1), Validators.max(90)]);
    this.maxDays=90
  } else {
    this.m.noOfDays.setValidators([Validators.required, Validators.min(1)]);
  }

  this.m.noOfDays.updateValueAndValidity();
}


}
