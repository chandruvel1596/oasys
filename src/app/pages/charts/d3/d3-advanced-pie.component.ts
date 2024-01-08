import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../_services/dashboard.service';

@Component({
  selector: 'ngx-d3-advanced-pie',
  template: `
    <ngx-charts-advanced-pie-chart
    [view]="[700,400]"
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieComponent implements OnDestroy {
  single = [];
  colorScheme: any;
  themeSubscription: any;
  showLegend = false;
  true=true

  constructor(private theme: NbThemeService, private dashboardservice:DashboardService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.infoLight, colors.successLight, colors.dangerLight, colors.successLight, colors.dangerLight],
      };
    });
    this.dashboardservice.getallDashboardCount().subscribe(
      (data)=> {
      this.single=[{ name: 'Total devices', value: data.totalDevice },
        { name: 'active devices', value: data.totalActiveDevices },
        { name: 'Inactive devices', value: data.totalInActiveDevices},
        { name: 'Registered devices in UIDAI', value: data.totalRegisterdDevicesUidai},
        { name: 'Deregistered devices in UIDAI', value: data.totalDeRegisterdDevicesUidai },]
      })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
