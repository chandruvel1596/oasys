import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { DatePipe } from '@angular/common';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Registerdevice } from '../../deviceRegister/registerdevice';
import { Title as pageTitle } from '@angular/platform-browser';
@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [DatePipe]
})
export class EditComponent implements OnInit {
  datas:any;
  id!: number;
  dataModel!: any;
  registerDevice!: Registerdevice;
  form!: FormGroup;
  dataArray:any;
  dataStatus:any;
  dataServerenvironment:any;
  title = 'Edit Device Detail';

  constructor(private route : ActivatedRoute,public registerdeviceService:RegisterdeviceService,private router:Router,public datepipe: DatePipe,
    private toastrService:NbToastrService,private titleService:pageTitle) {

     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

      this.form = new FormGroup({
        deviceModelId: new FormControl('', [Validators.required]),
        serialNo: new FormControl('', Validators.required),
        activeStatus: new FormControl('', Validators.required),
        remarks: new FormControl('',[]),
        serverEnvironmentId:new FormControl('',Validators.required),
        createdDate: new FormControl('',[])
      });
      this.getallModel();
      this.getActiveStatus();
      this.getallServerEnvironment();

      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.getDeviceRegiserDetail(this.id);
    }, 1000);
    this.titleService.setTitle(this.title);
      
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

    //getDeviceRegiserDetail();
  }

  getDeviceRegiserDetail(id){
    this.registerdeviceService.editRegistedevice(id).subscribe((datas:any) => {
          this.registerDevice = datas.data;
         

            this.form = new FormGroup({
              deviceModelId: new FormControl(`${datas.data.deviceModelId}`,[Validators.required]),
              serialNo: new FormControl(datas.data.serialNo,[Validators.required]),
              activeStatus: new FormControl(`${datas.data.activeStatusId}`,[Validators.required]),
              remarks: new FormControl(datas.data.remarks),
              serverEnvironmentId:new FormControl(`${datas.data.serverEnvironmentId}`,[Validators.required]),
              createdDate:new FormControl(datas.data.createdDate),
            });
        
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
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    const form_array = this.form.value;
    delete form_array['createdDate'];
    form_array['id'] = this.id;
     
    this.registerdeviceService.update(form_array).subscribe((res:any) => {
       if(res.message!='Success'){
          this.showToast('warning',res.message);
       }else if(res){
       
        this.showToast('success','Device Detail Updated Successfully');
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
