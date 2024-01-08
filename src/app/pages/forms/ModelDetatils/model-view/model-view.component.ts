import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';
import { DatePipe } from '@angular/common';
import { NbToastrService,NbComponentStatus } from '@nebular/theme';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Registerdevice } from '../../deviceRegister/registerdevice';

@Component({
  selector: 'ngx-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit {

  datas:any;
  id!: number;
  dataModel!: any;
  registerDevice!: Registerdevice;
  form!: FormGroup;
  dataArray:any;
  dataStatus:any;
  dataServerenvironment:any;
  constructor(private route : ActivatedRoute,public registerdeviceService:RegisterdeviceService,private router:Router,public datepipe: DatePipe,private toastrService:NbToastrService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    
      
      this.form = new FormGroup({
        deviceModelId: new FormControl('', [Validators.required]),
        serialNo: new FormControl('', Validators.required),
        activeStatus: new FormControl('', Validators.required),
        remarks: new FormControl('',[]),
        serverEnvironmentId:new FormControl('',Validators.required),
        createdDate: new FormControl('',[])
      });
     
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.getDeviceRegiserDetail(id);
    }, 1000);
  }

  getDeviceRegiserDetail(id){
    //console.log(id);
    this.registerdeviceService.editRegistedevice(id).subscribe((datas:any) => {
          this.registerDevice = datas.data;
         
            // let contact = {
            //   deviceModelId: `${datas.data.deviceModelId}`,
            //   serialNo: datas.data.serialNo,
            //   activeStatus: `${datas.data.activeStatusId}`,
            //   remarks: datas.data.remarks,
              
            // };
         
            // this.form.setValue(contact);

            this.form = new FormGroup({
              deviceModelId: new FormControl({value:`${datas.data.deviceModelId}`,disabled: true}),
              serialNo: new FormControl({value:datas.data.serialNo,disabled: true}),
              activeStatus: new FormControl({value:`${datas.data.activeStatusId}`,disabled: true}),
              remarks: new FormControl({value:datas.data.remarks,disabled: true}),
              serverEnvironmentId:new FormControl({value:`${datas.data.serverEnvironmentId}`,disabled: true}),
              createdDate:new FormControl({value:datas.data.createdDate,disabled: true}),
            });
        
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


  // Cancel the page

  cancel(){
    //this.router.navigateByUrl('pages/forms/deviceregisterList');
    this.router.navigate([`pages/forms/deviceregisterList`], {
      skipLocationChange: true,
    });
  }


}
