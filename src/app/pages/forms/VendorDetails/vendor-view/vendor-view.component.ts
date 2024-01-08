import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../_services/storage.service';

@Component({
  selector: 'ngx-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.scss']
})
export class VendorViewComponent implements OnInit {

  active:boolean=false;
  orgID:any
  cardWidth:string='100%'
  

  constructor(private router: Router,private route: ActivatedRoute,private storageService:StorageService) {
    this.orgID = this.storageService.getUser().organizationID; 
   }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      // Check if the current route is active
      if(this.router.isActive('/pages/forms/vendorDetailList/vendorRegister',true) ){
        this.active = true ;
        this.cardWidth='100%'
        
      }

      else if(this.router.isActive('/pages/forms/vendorDetailList/changePassword',true)  ){
        this.active = true ;
        this.cardWidth='50%'

      }
      
      else {
        this.active=false
        this.cardWidth='100%'
      } 
    });
  }

  vendorDetails(){
    this.router.navigate([`/pages/forms/vendorDetailList`], {
      skipLocationChange: true,
    })


  }

  vendorRegister(){

    this.router.navigate([`/pages/forms/vendorDetailList/vendorRegister`], {
      skipLocationChange: true,
    })

  }

  changePassord(){
    this.router.navigate([`/pages/forms/vendorDetailList/changePassword`], {
      skipLocationChange: true,
    })
  }

  

}
