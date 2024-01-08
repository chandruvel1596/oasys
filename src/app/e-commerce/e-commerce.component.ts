import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Scroll } from '@angular/router';


@Component({
  selector: 'ngx-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {

  isNavbarFixed = false;
  navbarVisibleHeight = 40;
  year:any;

  constructor(private el: ElementRef,) { 
    this.year=new Date().getFullYear()
  }

  ngOnInit(): void {
    
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    console.log('window', e);
  }

  

}
