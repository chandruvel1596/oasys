import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService, } from '../_services/menu.service';
import { DashboardService } from '../_services/dashboard.service';
import { filter } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
      <ngx-masterbreadcrumbs></ngx-masterbreadcrumbs>
      <ngx-loader></ngx-loader>
      </router-outlet>
    </ngx-one-column-layout>
  `,
})
// <ngx-masterbreadcrumbs></ngx-masterbreadcrumbs>
export class PagesComponent {
  constructor(private menuService:MenuService,private dashboardServcice: DashboardService,private menu1:NbMenuService,private router: Router){
   
      //   menuFields.forEach(menuField => {
      //     const anchorTags = menuField.querySelectorAll('a');
      //     anchorTags.forEach(anchorTag => {
      //       console.log(anchorTag.getAttribute('href'));
      //     });
      //   });

  
  

    // var menufield=document.querySelectorAll('.menu-items')
    // console.log(menufield)


    this.menu1.onSubmenuToggle().subscribe((data) => {
        this.collapseOtherItems(data.item);
      
    });

    this.menu1.onItemClick().subscribe((res)=>{
      if(res.item.title==="Dashboard"){
        this.menu.forEach(a=>{
          a.expanded=false
        })

      }
    })
  }

  ngOnInit(){
    this.menuService.getallDashboardMenu()
    .subscribe((res)=>{
      res.data.forEach(item => {
        if (item.children.length === 0) {
          delete item.children;
        }
      });
      this.menu=res.data
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.highlightActiveMenuItem(this.router.url);
      }
    });
    setTimeout(()=>{
      this.highlightActiveMenuItem(this.router.url);
    },1200)
    
  
  }
  

  highlightActiveMenuItem(currentUrl: string) {
    const removal=['vendorDetails','vendorRegister','changePassword','Url','Mc','deviceregisterAdd','bulkdetail','view','edit']
    const regexPattern = new RegExp(`(${removal.join('|')})|\\d+|\\/$`, 'gi');
    let updatedCurrentUrl = currentUrl.replace(regexPattern, '');
    updatedCurrentUrl = updatedCurrentUrl.replace(/\/+$/, '');
    console.log(updatedCurrentUrl)

    const menuItems = document.querySelectorAll('.menu-items'); // Replace with your actual menu class
    menuItems.forEach((menuItem: HTMLElement) => {
      const anchorTags = menuItem.querySelectorAll('a');
      anchorTags.forEach((anchorTag: HTMLAnchorElement) => {
        
        
        if (anchorTag.getAttribute('href').includes  (`#${updatedCurrentUrl}`)) {
          //           console.log(anchorTag.getAttribute('href'))
          // console.log(currentUrl)
          
          
          anchorTag.classList.add('highlight'); // Apply your desired class
        } else {
          anchorTag.classList.remove('highlight'); // Remove the class if it doesn't match
          // console.log(anchorTag.getAttribute('href'))
          // console.log(currentUrl)

        }
      });
    });
  }

  collapseOtherItems(selectedItem: NbMenuItem) {
    this.menu.forEach((item) => {
    
      
      if (item !== selectedItem) {
        item.expanded = false;
      }
      else {
        item.expanded=item.expanded===true?true:false
      }
  });
  }




  //menu = MENU_ITEMS;
  userRole = localStorage.getItem('userRole');
  menu:NbMenuItem[] = []

    // {
    //   title: 'Dashboard',
    //   icon: 'home-outline',
    //   link: '/pages/iot-dashboard',
    //   skipLocationChange:true,
    //   data: { title: 'Dashboard' },
    // },
    // {
    //   title: 'Master',
    //   icon: 'layout-outline',
    //   children: [
    //     {
    //       title: 'Vendor Details',
    //       icon:'people-outline',
    //       link: '/pages/forms/vendorDetailList',
    //       skipLocationChange:true,

    //     },
    //     {
    //       title: 'Model Details',
    //       icon:'cube-outline',
    //       link: '/pages/forms/modelDetailList',
    //       skipLocationChange:true,
    //     },
    //     {
    //       title: 'Device Details',
    //       icon:'film-outline',
    //       link: '/pages/forms/deviceregisterList',
    //       skipLocationChange:true,
    //     },
        
    //   ],
    // },
    // {
    //   title: 'Reports',
    //   icon: 'grid-outline',
    //   children: [
    //     {
    //       title: 'Registered Device Details',
    //       icon:'shield-outline',
    //       link: '/pages/forms/registeredDeviceReport',
    //       skipLocationChange:true,
    //     },
    //     {
    //       title: 'DeRegistered Device Details',
    //       link: '/pages/forms/deRegisteredDeviceReport',
    //       icon:'shield-off-outline',
    //       skipLocationChange:true,

    //     },
    //     {
    //       title: 'Key Rotation Report',
    //       icon:'layers-outline',
    //       link: '/pages/forms/keyRotationReport',
    //       skipLocationChange:true,
    //     },
    //     {
    //       title: 'Date wise Report',
    //       icon:'calendar-outline',
    //       link: '/pages/forms/datewiseReport',
    //       skipLocationChange:true,
    //     },
    //   ],
     
    // },
    // {
    //   title: 'Settings',
    //   icon: 'settings',
    //   children:[
    //     {
    //       title: 'Global Configuration',
    //       icon:'globe-outline',
    //       link: '/pages/forms/globalConfig',
    //       skipLocationChange:true,
    //     },
    //     {
    //       title: 'Vendor Configuration',
    //       icon:'person-done-outline',
    //       link: '/pages/tables/tree-grid',
    //       skipLocationChange:true,
    //     },
    //    { 
    //     title:'APK upgrade',
    //     icon:'arrowhead-up-outline',
    //     link: '/pages/forms/apk',
    //   skipLocationChange:true,}
    //   ],
      
    // }]
  }

   



    
    // {
    //   title: 'Forms',
    //   icon: 'edit-2-outline',
    //   children: [
    //     {
    //       title: 'Form Inputs',
    //       link: '/pages/forms/inputs',
    //     },
    //     {
    //       title: 'Form Layouts',
    //       link: '/pages/forms/layouts',
    //     },
    //     {
    //       title: 'Buttons',
    //       link: '/pages/forms/buttons',
    //     },
    //     {
    //       title: 'Datepicker',
    //       link: '/pages/forms/datepicker',
    //     },
    //   ],
    // }


