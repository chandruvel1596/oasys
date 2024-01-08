import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../@core/data/smart-table';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from './match.validator';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
registerForm:any;
submitted=false;
isRegisterFailed=false;
errorMessage = '';
showPassword=false;
showRepeatPassword=false;
  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService,private toastrService: NbToastrService){

  }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      userName:['',[Validators.required]] ,
      password: ['',[Validators.required,Validators.maxLength(15),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      companyName:['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,numberLengthValidator(10)]],
      roleId:['1',[Validators.required]],
      repeatPassword:['',[Validators.required]],
  },{ validator:matchPassword.matchPassword})
    
    
  }

  get f(){return this.registerForm.controls}

  registerSubmit(){
    this.submitted=true;
     if(this.registerForm.valid){
      const form={...this.registerForm.value}
      form.mobile = form.mobile.toString();
      delete form.repeatPassword
       this.auth.register(form)
       .subscribe((res:any)=>{
          
            console.log(res)

       

        if(res.data.activeStatus===1 || res.data.activeStatus==="1" ){
          
          this.showToast('success', 'Registered successfully')
          this.router.navigate([`auth`], {
            skipLocationChange: true,
          });
       }
       else{
        this.showToast('danger','Register unsuccessful')
       }
},(error) => {
  // Handle API error
  this.errorMessage = error.message;
  console.error('API Error:', error);
})
  
      }}

  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(status, `${message}`, { status });
  }
  

  login(){
    this.router.navigate([`auth`], {
      skipLocationChange: true,
    });
  }

  preventPaste(event: Event): void {
    event.preventDefault();
  }
}

// Custom validator for numeric input with a specific number of digits
export function numberLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === null || control.value === undefined) {
      return null; // Return null if the value is not set (optional)
    }

    const valueAsString = control.value.toString();
    if (valueAsString.length === length) {
      return null; // Length is as expected; validation passed.
    } else {
      return { 'numberLength': true }; // Length is not as expected; validation failed.
    }
  };
}




  // settings = {
  //   add: {
  //     addButtonContent: '<i class="nb-plus"></i>',
  //     createButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //   },
  //   edit: {
  //     editButtonContent: '<i class="nb-edit"></i>',
  //     saveButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="nb-trash"></i>',
  //     confirmDelete: true,
  //   },
  //   columns: {
  //     id: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     firstName: {
  //       title: 'First Name',
  //       type: 'string',
  //     },
  //     lastName: {
  //       title: 'Last Name',
  //       type: 'string',
  //     },
  //     username: {
  //       title: 'Username',
  //       type: 'string',
  //     },
  //     email: {
  //       title: 'E-mail',
  //       type: 'string',
  //     },
  //     age: {
  //       title: 'Age',
  //       type: 'number',
  //     },
  //   },
  // };

  // source: LocalDataSource = new LocalDataSource();

  //  constructor(private service: SmartTableData, private router:Router) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  // ngOnInit(): void {
  // }

  // login(){

  //   this.router.navigate([`auth`], {
  //     skipLocationChange: true,
  //   });

  // }


