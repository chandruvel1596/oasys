import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../../_services/auth.service';
import { matchPassword } from '../../../../register/match.validator';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';

@Component({
  selector: 'ngx-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.scss']
})
export class VendorRegisterComponent implements OnInit {

  registerForm: any;
  submitted = false;
  isRegisterFailed = false;
  errorMessage = '';
  showPassword = false;
  showRepeatPassword = false;
  animation =false

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private toastrService: NbToastrService,) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      companyName: ['', [Validators.required]],
      address:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, numberLengthValidator(10)]],
      roleId: ['1', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    }, { validator: matchPassword.matchPassword })



  }

  ngAfterViewOnit(){
    this.animation=true

  }

  get f() { return this.registerForm.controls }

  registerSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const form = { ...this.registerForm.value }
      form.mobile = form.mobile.toString();
      delete form.repeatPassword
      this.auth.register(form)
        .subscribe((res: any) => {

          console.log(res)
         if (res.data?.activeStatus === 1 || res.data?.activeStatus === "1") {
           this.showToast('success', 'Registered successfully')
            setTimeout(()=>{
              this.router.navigate([`auth`], {
                skipLocationChange: true,
              });
            },500)
 
          }
          else {
            this.showToast('danger', res.Message)
          }
        }, (error) => {
          // Handle API error
          this.errorMessage = error.message;
          console.error('API Error:', error);
        })

    }
  }

  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(status, `${message}`, { status });
  }


  login() {
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
