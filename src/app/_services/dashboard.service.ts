import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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

  /**
   * Get All Register Device List
   *
   * @return response()
   */
  getallDashboardCount(): Observable<any> {
    
    return this.httpClient.post(this.apiURL + environment.dashboardCountData,{id:this.userRole},this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /** 
   * Write code on Method
   *
   * @return response()
   */
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
