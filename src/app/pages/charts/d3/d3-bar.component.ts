import { Component, OnDestroy } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../_services/dashboard.service';
import { CharttooltipComponent } from '../../dashboard/weather/charttooltip/charttooltip.component';

@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical
    [view]="[530, 400]"
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [showXAxisLabel]="true"
      [showYAxisLabel]="true"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [showDataLabel]="true"
      [legendPosition]="legendPosition" 
      [trimXAxisTicks]="true"
      [rotateXAxisTicks]="true"
      [roundDomains]="true"
      [legendTitle]="''"
      [barPadding]="barPadding"
      (select)="onBarClick($event)">
      
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnDestroy {
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'device details';
  yAxisLabel = 'Count';
  colorScheme: any;
  themeSubscription: any;
  showLegend = true;
  legendPosition="bottom";
  barPadding=30

  results = []
  //   { name: 'Total devices', value: this.totalDevices },
  //   { name: 'active devices', value: this.activeDevices },
  //   { name: 'Inactive devices', value: this.inactiveDevices},
  //   { name: 'Registered devices in UIDAI', value: this.registeredDevices },
  //   { name: 'Deregistered devices in UIDAI', value: this.deregisteredDevices },
  // ];
  
  
  constructor(private theme: NbThemeService, private dashboardservice:DashboardService,private dialogService: NbDialogService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.infoLight, colors.successLight, colors.dangerLight, colors.successLight, colors.dangerLight],
      };
    });

    this.dashboardservice.getallDashboardCount().subscribe(
      (data)=> {
      this.results=[{ name: 'Total devices', value: data.totalDevice },
        { name: 'active devices', value: data.totalActiveDevices },
        { name: 'Inactive devices', value: data.totalInActiveDevices},
        { name: 'Registered devices in UIDAI', value: data.totalRegisterdDevicesUidai},
        { name: 'Deregistered devices in UIDAI', value: data.totalDeRegisterdDevicesUidai },]
    // this.totalDevices=data.totalDevice;
    // this.activeDevices=data.totalActiveDevices;
    // this.inactiveDevices=data.totalInActiveDevices;
    // this.registeredDevices=data.totalRegisterdDevicesUidai;
    // this.deregisteredDevices=data.totalDeRegisterdDevicesUidai;
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onBarClick(event){
    const dialogRef = this.dialogService.open(CharttooltipComponent, {
      context: { title: event.name},
      autoFocus: false 
    });
    dialogRef.onClose.subscribe((resp) => {
      console.log(`dialog closed`);
    });

  }
}