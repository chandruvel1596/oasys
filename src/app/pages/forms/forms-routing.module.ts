import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { IndexComponent } from './deviceRegiser/index/index.component';
import { CreateComponent } from './deviceRegiser/create/create.component';
import { EditComponent } from './deviceRegiser/edit/edit.component';
import { ViewComponent } from './deviceRegiser/view/view.component';
import { ModelListComponent } from './ModelDetatils/model-list/model-list.component';
import { VendorListComponent } from './VendorDetails/vendor-list/vendor-list.component';
import { ConsolidatedReportComponent } from './Reports/consolidated-report/consolidated-report.component';
import { RegisteredDeviceReportComponent } from './Reports/registered-device-report/registered-device-report.component';
import { DeRegisteredDeviceReportComponent } from './Reports/de-registered-device-report/de-registered-device-report.component';
import { KeyRotationReportComponent } from './Reports/key-rotation-report/key-rotation-report.component';
import { DatewiseReportComponent } from './Reports/datewise-report/datewise-report.component';
import { BulkdetailComponent } from './deviceRegiser/bulkdetail/bulkdetail.component';
import { ApkComponent } from './Apk/apk/apk.component';
import { GlobalConfigurationComponent } from './global-configuration/global-configuration.component';
import { VendorViewComponent } from './VendorDetails/vendor-view/vendor-view.component';
import { Path } from 'leaflet';
import { RegisterComponent } from '../../register/register.component';
import { VendorRegisterComponent } from './VendorDetails/vendor-register/vendor-register.component';
import { UrlConfigComponent } from './global-configuration/url-config/url-config.component';
import { McConfigComponent } from './global-configuration/mc-config/mc-config.component';
import { ResetComponent } from './VendorDetails/reset/reset.component';
import { ChangePasswordGuard } from '../../guards/change-password.guard';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'inputs',
        component: FormInputsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
      },
      {
        path: 'deviceregisterList',
        component: IndexComponent,
      },
      {
        path: 'deviceregisterList/deviceregisterAdd',
        component: CreateComponent,
      },
      {
        path:'deviceregisterList/bulkdetail',
        component:BulkdetailComponent
      },
      { path: 'deviceregisterList/view/:id', component: ViewComponent },
      { path: 'deviceregisterList/edit/:id', component: EditComponent },
      {
        path: 'modelDetailList',
        component: ModelListComponent,
        data:{title:'Model Details'}
      },
      {
        path: 'vendorDetailList',
        component: VendorViewComponent,
        data:{title:'Vendor Details'},
        children:[
          {
            path: 'vendorDetails',
          component:VendorListComponent
        },
        {
          path:'vendorRegister',
          component:VendorRegisterComponent
        },
        {
          path:'changePassword',
          component:ResetComponent,
          canActivate: [ChangePasswordGuard] 
        },
        {
          path:'', redirectTo:'vendorDetails',pathMatch:'full'

        }

        ]
      },
      {
        path: 'consolidatedreport',
        component: ConsolidatedReportComponent,
      },
      {
        path: 'registeredDeviceReport',
        component: RegisteredDeviceReportComponent,
        data:{title:'Registered Device Details'}
      },
      {
        path: 'deRegisteredDeviceReport',
        component: DeRegisteredDeviceReportComponent,
        data:{title:'DeRegistered Device Details'}
      },
      {
        path: 'keyRotationReport',
        component: KeyRotationReportComponent,
        data:{title:'Key Rotation Report'}
      },
      {
        path: 'datewiseReport',
        component: DatewiseReportComponent,
        data:{title:'Date Wise Report'}
      },
      {
        path: 'apk',
        component:ApkComponent,
        data:{title:'APK Upgrade'}
      },
      {
        path: 'globalConfig',
        component:GlobalConfigurationComponent,
        data:{title:'Global Configuration'},
        children:[
          {path:'Url', component:UrlConfigComponent},
          {path:'Mc', component:McConfigComponent},
          {path:'', redirectTo:'Url',pathMatch:'full'}

        ]
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

