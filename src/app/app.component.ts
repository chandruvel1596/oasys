/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component,ViewChild,TemplateRef,ElementRef,AfterViewInit, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { NbMenuService } from '@nebular/theme';
import { filter } from 'rxjs/operators/filter';
import { Router } from '@angular/router';
import { Idle,DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { HttpClient } from '@angular/common/http';
import { Title as pageTitle } from '@angular/platform-browser';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  tag = 'my-context-menu';
  
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'RdService Application';

  dtOptions: DataTables.Settings = {};
  posts: any;


  isLoginFailed = false;
  errorMessage = '';

  default_username = 'oasys1';
  default_password = 'oasys';

  constructor(private idle: Idle, private keepalive: Keepalive,private storageService: StorageService, 
    private authService: AuthService,private analytics: AnalyticsService, private seoService: SeoService,
    private menuService: NbMenuService,private router:Router,private http: HttpClient,private titleService:pageTitle) {
    this.menuService.onItemClick()
    .subscribe((event) => {
      if(event.item.title=='Log out'){
        localStorage.clear();
        this.storageService.clean();
        location.reload();
        // this.router.navigate([`/`], {
        //   skipLocationChange: true,
        // });
      }
    });

     // sets an idle timeout of 5 seconds, for testing purposes.
     idle.setIdle(300);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     idle.setTimeout(300);
     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
     idle.onIdleEnd.subscribe(() => { 
       this.idleState = 'No longer idle.'
       console.log(this.idleState);
       this.reset();
       
       
       this.authService.login(this.default_username, this.default_password).subscribe({
         next: data => {
           //console.log(userName);
           if(data.status==1){
             localStorage.setItem('userName', this.default_username);
             localStorage.setItem('access_token', data.token);
             localStorage.setItem('userRole', data.roleId);
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
           this.errorMessage = err.error.message;
           this.isLoginFailed = true;
         }
       });
     });
     
     idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
       console.log(this.idleState);
       this.storageService.clean();
       localStorage.clear();
       //this.router.navigateByUrl('/auth/login');
      //  this.router.navigate([`/`], {
      //   skipLocationChange: true,
      // });
      location.reload();
     });
     
     idle.onIdleStart.subscribe(() => {
         this.idleState = 'You\'ve gone idle!'
         console.log(this.idleState);
         
     });
     
     idle.onTimeoutWarning.subscribe((countdown) => {
       this.idleState = 'You will time out in ' + countdown + ' seconds!'
       console.log(this.idleState);
     });
 
     // sets the ping interval to 15 seconds
     keepalive.interval(15);
 
     keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
     this.reset();

     this.http.get('http://jsonplaceholder.typicode.com/posts')
        .subscribe(posts => {
          this.posts = posts;
      }, error => console.error(error));

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log('user',user)
      this.roles = user.roles;
      this.username = user.username;
    }
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.titleService.setTitle(this.title);


    //menu bar highlight
    

  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

}
