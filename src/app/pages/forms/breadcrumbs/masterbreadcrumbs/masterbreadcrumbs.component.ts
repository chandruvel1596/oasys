import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ngx-masterbreadcrumbs',
  templateUrl: './masterbreadcrumbs.component.html',
  styleUrls: ['./masterbreadcrumbs.component.scss']
})
export class MasterbreadcrumbsComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor( private router: Router) {

    this.router.events.subscribe(event => {


      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(this.router.url);
        //  console.log('check',this.breadcrumbs)
      }
    });
  }
  ngOnInit(): void {
    // console.log(this.breadcrumbs)

  }


  createBreadcrumbs(url: string): Array<{ label: string, url: string }> {
    //Implement logic to create breadcrumbs from the URL
    //You can split the URL and generate breadcrumb items
    //Example:
    // console.log(url)
    const parts = url.split('/');
    // console.log('parts', parts)
    const breadcrumbs: Array<{ label: string, url: string }> = [];
    const master = ['modelDetailList', 'vendorDetailList', 'deviceregisterList']
    const reports = ['registeredDeviceReport', 'deRegisteredDeviceReport', 'keyRotationReport', 'datewiseReport']
    const settings = ['globalConfig', 'apk']


    parts.forEach((part, index) => {


      if (part) {
        let title = ''
        // console.log('part', part)
        // console.log('index', index)
        switch (part) {
          case 'iot-dashboard':
            title = 'Dashboard'
            break;
          case 'pages':
            if (master.some(value => parts.includes(value))) {
              title = 'Master'
            }
            else if (reports.some(value => parts.includes(value))) {
              title = 'Reports'
            }
            else if (settings.some(value => parts.includes(value))) {
              title = 'Settings'
            }
            else {
              return
            }
            break;
          case 'forms':
            break;
          case 'modelDetailList':
            title = 'Model Details'
            break;
          case 'vendorDetailList':
            title = 'Vendor Details'
            break
          case 'vendorDetails':
            title = 'Vendor Details'
            break
          case 'deviceregisterList':
            title = 'Device Details'
            break
          case 'registeredDeviceReport':
            title = 'Registered Device Details'
            break
          case 'deRegisteredDeviceReport':
            title = 'DeRegistered Devices Details'
            break
          case 'keyRotationReport':
            title = 'Key Rotation Report'
            break
          case 'datewiseReport':
            title = 'Date wise Report'
            break
          case 'globalConfig':
            title = 'Global Configuration'
            break
          case 'apk':
            title = 'APK upgrade'
            break
          case 'register':
            title = 'Vendor Registration'
            break
          case 'deviceregisterAdd':
            // const addDevice=[
            //   {label:'Master',url:''},
            //   {label:' / Device Details',url:''},
            //   {label:' / Add Device Detail',url:''}
            // ]
            // addDevice.forEach(obj=>breadcrumbs.push(obj))
            title = 'Add Device Detail'
            break
          case 'bulkdetail':
            title = 'Add BulkDevice Detail'
            break
          case 'view':
            parts.pop()
            title = 'View Device Detail'
            break
          case 'edit':
            parts.pop()
            title = 'Edit Device Detail'
            break
          case 'Url':
            title = 'URL Configuration'
            break
          case 'Mc':
            title = 'MC Validity Configuration'
            break
          case 'changePassword':
           title='Change Password'
           break  
          default:
            title = part
            break;
        }

        const breadcrumbItem = {
          label: title,
          url: parts.slice(0, index + 1).join('/')
        };
        // console.log('url', breadcrumbItem.url)
        if(breadcrumbItem.label!==''){
        breadcrumbs.push(breadcrumbItem);
        }
      }
      else {
        const breadcrumbItem = {
          label: '<i class="fa fa-house fa-sm"></i>',
          url: parts.slice(0, index + 1).join('/')
        };
        breadcrumbs.push(breadcrumbItem);

      }
    });

    return breadcrumbs;


  }




}
