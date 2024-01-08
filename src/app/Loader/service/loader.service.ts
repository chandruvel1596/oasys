import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private spinnerVisible = new BehaviorSubject<boolean>(false);
  public readonly isVisible=this.spinnerVisible.asObservable();

  public animateEmitter=new EventEmitter<boolean>()

  constructor() { }

  show() {
    this.spinnerVisible.next(true);
  }

  hide() {
    this.spinnerVisible.next(false);
    
  }

 

}
