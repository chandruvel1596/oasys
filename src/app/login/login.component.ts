import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Users } from '../_services/users';
import { Router } from '@angular/router';
import { fail } from 'assert';
import { event } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    userName: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showPassword=false;

  protected options: {};
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  
  submitted=false;
  rememberMe: boolean;
  public user: any = {};
  users: Users = new Users()
  isReadOnly = true;
  isButtonActive=false;
  
  constructor(private authService: AuthService, private storageService: StorageService,private router:Router) {
    
   }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate([`/pages/iot-dashboard`], {
        skipLocationChange: true,
      });
    }

     //deal with pesky autocomplete
     setTimeout(() => {
      this.isReadOnly = false;
    }, 1000);
    
  }

  onSubmit(): void {
    const { userName, password } = this.form;
    //console.log(this.form);
    this.authService.login(userName, password).subscribe({
      next: data => {
        console.log('login', data);
        delete localStorage.access_token;
        if(data.status==1 || data.status=='1' ){
          localStorage.setItem('userName', userName);
          localStorage.setItem('access_token', data.token);
          localStorage.setItem('userRole', data.status);
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          //this.router.navigateByUrl('/pages/iot-dashboard');
          this.router.navigate([`/pages/iot-dashboard`], {
            skipLocationChange: true,
          });
        }else{
          this.errorMessage = data.message;
           this.isLoginFailed = true;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  register(){

    this.router.navigate([`auth/register`], {
      skipLocationChange: true,
    });

}

@HostListener('document:keydown', ['$event'])
onKeyPress(event: KeyboardEvent): void {
  
  if (event.key === 'Enter') {
    this.activateButton();
  }
}

activateButton(){
  this.isButtonActive = true;
  setTimeout(() => this.isButtonActive = false, 200); // Remove the 'active' state after 200ms (adjust as needed)
}

}

