import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  year:any;

  constructor() { 
    this.year=new Date().getFullYear()
  }

  ngOnInit(): void {
  }

}
