import { Component, OnDestroy } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../_services/dashboard.service';
import { CharttooltipComponent } from '../../dashboard/weather/charttooltip/charttooltip.component';

@Component({
  selector: 'ngx-d3-pie',
  template: `
    <ngx-charts-pie-chart
    [view]="[530, 400]"
      [scheme]="colorScheme"
      [results]="results"
      [legend]="showLegend"
      [labels]="showLabels"
      [explodeSlices]="false"
      [doughnut]="true" 
      [arcWidth]="'0.50'"
      [trimLabels]="false"
      [gradient]="false"
      [legendTitle]="legendTitle"
      [legendPosition]="legendPosition"
      (select)="onPieClick($event)">
    </ngx-charts-pie-chart>
  `,
})
export class D3PieComponent implements OnDestroy {
  results = [];
  showLegend = true;
  showLabels = true;
  colorScheme: any;
  themeSubscription: any;
  legendPosition='right';
  legendTitle=''

  constructor(private theme: NbThemeService, private dashboardservice:DashboardService,private dialogService: NbDialogService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.infoLight,colors.successLight,  colors.dangerLight, colors.successLight,  colors.dangerLight],
      };
    });
    this.dashboardservice.getallDashboardCount().subscribe(
      (data)=> {
      this.results=[{ name: 'Total devices', value: data.totalDevice },
      { name: 'Registered devices in UIDAI', value: data.totalRegisterdDevicesUidai},
        { name: 'Inactive devices', value: data.totalInActiveDevices},
        { name: 'active devices', value: data.totalActiveDevices },
        { name: 'Deregistered devices in UIDAI', value: data.totalDeRegisterdDevicesUidai },]
      })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onPieClick(event){
    console.log('legend event',event)
    if (typeof event === 'string') {
      const dialogRef = this.dialogService.open(CharttooltipComponent, {
        context: { title:event  },
        autoFocus: false 
      });
      dialogRef.onClose.subscribe((resp) => {
        console.log(`dialog closed`);
      });

    }

    else{
      const dialogRef = this.dialogService.open(CharttooltipComponent, {
        context: { title:event.name  },
        autoFocus: false 
      });
      dialogRef.onClose.subscribe((resp) => {
        console.log(`dialog closed`);
      });

    }
  

  }
}
