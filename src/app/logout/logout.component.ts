import { Component, OnInit } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';
@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {

  ngOnInit(){
    //localStorage.removeItem('auth_app_token');
   // console.log('logout by dinesh');
    window.sessionStorage.clear();
    //this.router.navigateByUrl('/');
    this.router.navigate([`/`], {
      skipLocationChange: true,
    });
  }
  // this.authService.logout().subscribe({
  //   next: res => {
  //     console.log(res);
  //     this.storageService.clean();
  //    // window.location.reload();
  //   },
  //   error: err => {
  //     console.log(err);
  //   }
  // });

}
