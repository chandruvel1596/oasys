import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { DashboardService } from '../../_services/dashboard.service';
import { StorageService } from '../../_services/storage.service';
import { Title as pageTitle } from '@angular/platform-browser';
import { LoaderService } from '../../Loader/service/loader.service';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value:string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit,OnDestroy {

  private alive = true;
  solarValue: number;
  total_organizations:any;
  total_models:any;
  total_device:any;
  total_registerdevice_uidai:any;
  total_deregisterdevice_uidai:any; 
  total_activedevices:any;
  total_inactivedevices:any;
  chunks: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  lightCard: CardSettings = {
    title: 'Organizations',
    iconClass: 'nb-home',
    type: 'primary',
    value: '',
  };
  rollerShadesCard: CardSettings = {
    title: 'Models',
    iconClass: 'nb-roller-shades',
    type: 'success',
    value:'',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Devices',
    iconClass: 'nb-lightbulb',
    type: 'info',
    value:'',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Registered devices in UIDAI',
    iconClass: 'nb-snowy-circled',
    type: 'success',
    value:'',
  };
  lightCards: CardSettings = {
    title: 'Deregistered devices in UIDAI',
    iconClass: 'nb-tables',
    type: 'danger',
    value:'',
  };
  activeCards: CardSettings = {
    title: 'Active devices',
    iconClass: 'nb-layout-default',
    type: 'success',
    value:'',
  };
  inActiveCards: CardSettings = {
    title: 'In-Active devices',
    iconClass: 'nb-menu',
    type: 'danger',
    value:'',
  };
  
  title = 'Dashboard';

  constructor(private themeService: NbThemeService,
              private storageService:StorageService,
              private loaderservice:LoaderService,
              private solarService: SolarData,private service: SmartTableData,private dashboardservice:DashboardService,private titleService:pageTitle) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
    //console.log( this.statusCards);
    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

      const data = this.service.getData();
      this.source.load(data); 

      this.dashboardservice.getallDashboardCount().subscribe(
        (data)=> {
        this.total_organizations = data.totalOrganization;
        this.total_models = data.totalModel;
        this.total_device = data.totalDevice;
        this.total_registerdevice_uidai = data.totalRegisterdDevicesUidai;
        this.total_deregisterdevice_uidai = data.totalDeRegisterdDevicesUidai;
        this.total_activedevices =   data.totalActiveDevices;
        this.total_inactivedevices =   data.totalInActiveDevices;

        this.lightCard.value = this.total_organizations;
        this.rollerShadesCard.value = this.total_models;
        this.wirelessAudioCard.value = this.total_device;
        this.coffeeMakerCard.value = this.total_registerdevice_uidai;
        this.lightCards.value = this.total_deregisterdevice_uidai;
        this.activeCards.value =  this.total_activedevices;
        this.inActiveCards.value = this.total_inactivedevices;
      },
      err => {
        /*this.storageService.clean();
        localStorage.clear();
        location.reload();*/
      }
      
      );  
     
  }
 
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.chunks = this.chunkArray(this.statusCards, 3);
  }
 

  statusCards: any;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
    this.lightCards,
    this.activeCards,
    this.inActiveCards,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'success',
      },
      {
        ...this.lightCards,
        type: 'danger',
      },
      {
        ...this.activeCards,
        type: 'info',
      },
      {
        ...this.inActiveCards,
        type: 'danger',
      },
    ],
    dark: this.commonStatusCardsSet,
  };
  

  

  ngOnDestroy() {
    this.alive = false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  chunkArray(array: any[], size: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
}
