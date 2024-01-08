import { Component, OnInit } from '@angular/core';
import { RegisterdeviceService } from '../../../_services/registerdevice.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { ReportService } from '../../../_services/report.service';

@Component({
  selector: 'ngx-global-configuration',
  templateUrl: './global-configuration.component.html',
  styleUrls: ['./global-configuration.component.scss']
})
export class GlobalConfigurationComponent implements OnInit {

  url=false;
  animate=true;



  constructor(private router: Router) { 
     
    }

  ngOnInit(): void {

    this.router.events.subscribe((val) => {
      // Check if the current route is active
      if(this.router.isActive('/pages/forms/globalConfig/Mc',true)){
        this.url = true ;
      }
      
      else {
        this.url=false
      } 
    });

  }

  urlConfig(){
    this.router.navigate([`/pages/forms/globalConfig`], {
      skipLocationChange: true,
    })

  }

  MCConfig(){
    this.router.navigate([`/pages/forms/globalConfig/Mc`], {
      skipLocationChange: true,
    })
  }

  
  }


