import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Registerdevice } from '../pages/forms/deviceRegister/registerdevice';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
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
   * Get All KeyRotation Report List
   *
   * @return response()
   */
   getDatebasedKeyRotationreportList(rotationData): Observable<any> {
    //console.log('test');
    //console.log(this.httpOptions);
    return this.httpClient.post(this.apiURL + environment.GetdatebasedKeyRotationReport,rotationData,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

    /**
   * Get All Consolidated Report List
   *
   * @return response()
   */
    getConsolidatedreportList(reportData): Observable<any> {
      return this.httpClient.post(this.apiURL + environment.deviceDatewiseReport,reportData,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

    /**
   * Get All Registered Device Report List
   *
   * @return response()
   */
    getRegisteredDeviceReportList(reportData): Observable<any> {
      return this.httpClient.post(this.apiURL + environment.GetRegisteredDeviceReport,reportData,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

      /**
   * Get All DeRegistered Device Report List
   *
   * @return response()
   */
    getdeRegisteredDeviceReportList(reportData): Observable<any> {
        return this.httpClient.post(this.apiURL + environment.GetdeRegisteredDeviceReport,reportData,this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  

      /**
   * Get All Serial No List
   *
   * @return response()
   */
      getSerialnoList(): Observable<any> {
        return this.httpClient.post(this.apiURL + environment.GetallSerialNo,{id:this.userRole},this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
      }
    
   /**
   * Get All Model List
   *
   * @return response()
   */
      getallStatus(): Observable<any> {
        return this.httpClient.post(this.apiURL + environment.getUIDAIStatuscategory,{},this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
      }

   /**
   * Get All Status List
   *
   * @return response()
   */
          getModelList(): Observable<any> {
            return this.httpClient.post(this.apiURL + environment.GetallModel,{id:this.userRole},this.httpOptions)
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
