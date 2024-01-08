import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FormsModule as ngFormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../Loader/interceptor/loader.interceptor';
import { MasterbreadcrumbsComponent } from './forms/breadcrumbs/masterbreadcrumbs/masterbreadcrumbs.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ngFormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    LoaderComponent,
    MasterbreadcrumbsComponent
],
})
export class PagesModule {
}
