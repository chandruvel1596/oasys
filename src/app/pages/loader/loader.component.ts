import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../Loader/service/loader.service';

@Component({
  selector: 'ngx-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isVisible=this.loaderservice.isVisible
  constructor(private loaderservice:LoaderService) {

   }

  ngOnInit(): void {
  }

}
