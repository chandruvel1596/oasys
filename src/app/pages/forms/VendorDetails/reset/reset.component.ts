import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword, matchResetPassword } from '../../../../register/match.validator';
import { ResetService } from '../../../../_services/reset.service';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  reserForm:any;
  submitted=false;
  showPassword = false;
  showRepeatPassword = false;

  constructor(private fb:FormBuilder, private reset:ResetService,private toastrService: NbToastrService,private router:Router) { }

  ngOnInit(): void {

    this.reserForm=this.fb.group({
      newPassword:['',[Validators.required,Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',Validators.required],
    },{ validator: matchResetPassword.matchPassword })
  }

  resetSubmit(){
    this.submitted=true
    if(this.reserForm.valid){
      this.reset.changePassword(this.f.confirmPassword.value)
      .subscribe((data)=>{
       if(data){
        this.showToast('success', data.message)}
        setTimeout(()=>{
          this.router.navigate([`/pages/forms/vendorDetailList`], {
            skipLocationChange: true,
          });
        },800)

      })


    }
    console.log(this.reserForm.value)
  }

  get f(){
    return this.reserForm.controls
  }
  
  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(status, `${message}`, { status });
  }

}
