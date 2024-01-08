import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTooltipModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule as ngFormsModule,ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './deviceRegiser/index/index.component';
import { ViewComponent } from './deviceRegiser/view/view.component';
import { CreateComponent } from './deviceRegiser/create/create.component';
import { EditComponent } from './deviceRegiser/edit/edit.component';
import { DataTablesModule } from 'angular-datatables';
import { NbTooltipComponent } from '@nebular/theme';

import { ModelListComponent } from './ModelDetatils/model-list/model-list.component';
import { ModelViewComponent } from './ModelDetatils/model-view/model-view.component';
import { VendorListComponent } from './VendorDetails/vendor-list/vendor-list.component';
import { VendorViewComponent } from './VendorDetails/vendor-view/vendor-view.component';
import { ConsolidatedReportComponent } from './Reports/consolidated-report/consolidated-report.component';
import { RegisteredDeviceReportComponent } from './Reports/registered-device-report/registered-device-report.component';
import { DeRegisteredDeviceReportComponent } from './Reports/de-registered-device-report/de-registered-device-report.component';
import { KeyRotationReportComponent } from './Reports/key-rotation-report/key-rotation-report.component';
import { MomentModule } from 'angular2-moment';
import { DatewiseReportComponent } from './Reports/datewise-report/datewise-report.component';
import { BulkdetailComponent } from './deviceRegiser/bulkdetail/bulkdetail.component';
import { ApkComponent } from './Apk/apk/apk.component';
import { GlobalConfigurationComponent } from './global-configuration/global-configuration.component';
import { VendorRegisterComponent } from './VendorDetails/vendor-register/vendor-register.component';
import { UrlConfigComponent } from './global-configuration/url-config/url-config.component';
import { McConfigComponent } from './global-configuration/mc-config/mc-config.component';
import { ResetComponent } from './VendorDetails/reset/reset.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NbTooltipModule,
    MomentModule
  ],
  declarations: [
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
    IndexComponent,
    ViewComponent,
    CreateComponent,
    EditComponent,
    ModelListComponent,
    ModelViewComponent,
    VendorListComponent,
    VendorViewComponent,
    ConsolidatedReportComponent,
    RegisteredDeviceReportComponent,
    DeRegisteredDeviceReportComponent,
    KeyRotationReportComponent,
    DatewiseReportComponent,
    BulkdetailComponent,
    ApkComponent,
    GlobalConfigurationComponent,
    VendorRegisterComponent,
    UrlConfigComponent,
    McConfigComponent,
    ResetComponent,
  ],
})
export class FormsModule { }
