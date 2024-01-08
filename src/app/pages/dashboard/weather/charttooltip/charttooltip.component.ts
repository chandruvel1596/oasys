import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { RegisterdeviceService } from '../../../../_services/registerdevice.service';


@Component({
  selector: 'ngx-charttooltip',
  templateUrl: './charttooltip.component.html',
  styleUrls: ['./charttooltip.component.scss']
})
export class CharttooltipComponent implements OnInit {

  @Input() title: string;
  
  dtoptions: DataTables.Settings = {};

  dtTrigger:Subject<any>=new Subject<any>()

  themeSubscription: any;
  tableValue=[]
  box_shadow_color:any;
  colors:any;

  constructor(protected ref: NbDialogRef<CharttooltipComponent>,private service: RegisterdeviceService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;})
    this.dtoptions={
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 25,
      processing: true,
      retrieve: true,
    }

    this.fetchData();
   }

  ngOnInit(): void {

       //   dom: 'Bfrtip',
    //   buttons: [
    //     {
    //         extend: 'pdfHtml5',
    //         text: 'Device Details',
    //         footer: false,
    //         exportOptions: {
    //              columns: [0,1,2,3,4,5,6]
    //          }
    //     },
    //     {
    //         extend: 'csv',
    //         footer: false,
    //         exportOptions: {
    //           columns: [0,1,2,3,4,5,6]
    //       }
           
    //     },
    //     {
    //         extend: 'excel',
    //         footer: false,
    //         exportOptions: {
    //           columns: [0,1,2,3,4,5,6]
    //       }
    //     },
    //     {
    //       extend: 'print',
    //       footer: true,
    //       exportOptions: {
    //            columns: [0,1,2,3,4,5]
    //        }
    //   },         
    //  ] ,

     

    
  }

  ngAfterContentInit():void{
    }


  fetchData() {
 
    this.service.getallDeviceRegisterList().subscribe(
      (data)=> {
        if(this.title==="Total devices"){
          this.tableValue=data.data
          this.box_shadow_color=this.colors.infoLight
          
        }
        else if(this.title==="active devices"){
          this.tableValue=data.data.filter(x=>(x.activeStatusId==='1'))
          this.box_shadow_color=this.colors.successLight;

        }
        else if(this.title==="Inactive devices"){
          this.tableValue=data.data.filter(x=>(x.activeStatusId==='0'))
          this.box_shadow_color=this.colors.dangerLight;
        }

        else if(this.title==="Registered devices in UIDAI"){
          this.tableValue=data.data.filter(x=>(x.registeredUidaiId===1))
          this.box_shadow_color=this.colors.successLight;

        }

        else if(this.title==="Deregistered devices in UIDAI"){

          this.tableValue=data.data.filter(x=>(x.registeredUidaiId===2))
          this.box_shadow_color=this.colors.dangerLight;

        }
        this.dtTrigger.next(null);
      })
    }


    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
    close(){
      this.ref.close()
    }
}
