import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../_services/report.service';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-url-config',
  templateUrl: './url-config.component.html',
  styleUrls: ['./url-config.component.scss']
})
export class UrlConfigComponent implements OnInit {
  form:any;
  Mcform:any;
  dataStatus: any;
  dataServerenvironment: any;
  dataModel:any
  roleid=localStorage.getItem('userRole');
  maxDays: number;
  animate=false;
  constructor(private service: ReportService,public registerdeviceService: RegisterdeviceService, private router: Router,private fb:FormBuilder,
    private toastrService: NbToastrService) { 
     
    }

  ngOnInit(): void {
    this.form=this.fb.group({
      url:['',Validators.required],
      activeStatus:['1',Validators.required],
      environmentServerId:['',Validators.required],
      urlCategory:['',Validators.required]

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

  get f() {
    return this.form.controls;
  }

  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(status, `${message}`, { status });
  }
  submitDetails(){
    this.registerdeviceService.urlconfig(this.form.value).
    subscribe((res:any)=>{
      console.log(res)
      if (res.Message==="Url Successfully Saved"){
        this.showToast('success', `${res.Message}`)
        this.form.reset()
    this.form.get('activeStatus').setValue('1');

   }
   else{
      this.showToast('danger', "Url not saved");

   }

    })
   
  }

  resetform(){
    this.form.reset()
    this.form.get('activeStatus').setValue('1');
  }

}
