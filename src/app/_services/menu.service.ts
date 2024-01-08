import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  APIEndpoint = environment.APIEndpoint;
  private apiURL=this.APIEndpoint;
  public api_key:any;
  public userRole:any;
  httpOptions:any;

  constructor(private httpClient: HttpClient,private storageService: StorageService) { 
    this.api_key = this.storageService.getUser().token;
    this.userRole = this.storageService.getUser().organizationID; 
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.api_key}`
      })
    }
    
  }
  

  getallDashboardMenu(): Observable<any> {
    
    return this.httpClient.post(this.apiURL + environment.getAllMenu,{orgId:this.userRole},this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }


}
