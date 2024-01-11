import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from '../../../Loader/service/loader.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>

      <nb-layout-header fixed [ngClass]="{'animate-header':animateEmitter}">
        <ngx-header ></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
        <nb-sidebar-footer class="menu-footer" responsive>
                <nb-menu class="fott" [items]="footer">
                </nb-menu>
        </nb-sidebar-footer>
      </nb-sidebar>

      <nb-layout-column>
      
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  animateEmitter=false;

  constructor(private loaderservice:LoaderService,){

    this.loaderservice.animateEmitter.subscribe((res:boolean)=>{
    this.animateEmitter=res
  }
   )
  }

  // constructor(private router:Router){
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       const currentRoute = this.router.url;

  //       // Check if the current route is one that should have a background color
  //       if (currentRoute !== '/pages/iot-dashboard') {
  //         // Add a CSS class to nb-layout-column when navigating to component1
  //         document.querySelector('nb-layout-column').classList.remove('dashborad');
  //       } else {
  //         // Remove the CSS class when navigating to other components
  //         document.querySelector('nb-layout-column').classList.add('dashboard');
  //       }
  //     }
  //   });
  // }

  footer = [
    {
      title: 'Version : 1.0',
      group: 'bottom'
    },
  ]
}
