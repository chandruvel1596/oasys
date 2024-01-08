import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Registerdevice } from '../pages/forms/deviceRegister/registerdevice';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class RegisterdeviceService {
  APIEndpoint = environment.APIEndpoint;
  private apiURL=this.APIEndpoint;

  
  //public access_token = localStorage.getItem('access_token'); 
    /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `oasys ${this.access_token}`
  //   })
  // }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/

  public api_key:any;
  public userRole:any;
  httpOptions:any;
  httpOptions1:any;
  constructor(private httpClient: HttpClient,private storageService: StorageService) { 
    this.api_key = this.storageService.getUser().token;
    this.userRole = this.storageService.getUser().organizationID; 

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.api_key}`
      })
    }

    this.httpOptions1={
       headers : new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': `Bearer ${this.api_key}`
      })

    }

    
    
    
  }


  // ngOnInit() {
  //   //let api_key = "API_KEY_HERE";
  //   this.api_key = this.storageService.getUser().access_token;
  //   this.userRole = this.storageService.getUser().userRole; 

  //   const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `oasys ${this.api_key}`
  //     });

  //   this.httpOptions = { headers: headers };

  // }

    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getallModel(): Observable<any> {
    return this.httpClient.post(this.apiURL + environment.GetallModel,{id:this.userRole},this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

   /**
   * Write code on Method
   * Get All Active Status
   *
   * @return response()
   */
   getActiveStatus(): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.GetallActiveStatus,{},this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

   /**
   * Write code on Method
   * Get All Server Environment
   *
   * @return response()
   */
   getallServerEnvironment(): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.GetallServerEnvironment,{},this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(post:Registerdevice): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.RegisterdeviceNew, post, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
    
  }  
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/posts' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(post:Registerdevice): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.RegisterdeviceNew, post, this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts' + id, this.httpOptions)
  
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

 
  /**
   * Get All Register Device List
   *
   * @return response()
   */
  getallDeviceRegisterList(): Observable<any> {
    //console.log(this.httpOptions);
    return this.httpClient.post(this.apiURL + environment.GetallDeviceRegisterMaster,{id:this.userRole},this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  editRegistedevice(id): Observable<any> {
    return this.httpClient.post(this.apiURL + environment.EditdeviceRegisterMaster,{id:id},this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  /**
   * Write code on Method
   *
   * @return response()
   */
  deregister(serialNo,deviceId): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.DeRegister, {'serialNo':serialNo,'deviceId':deviceId}, this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

    /**
   * Write code on Method
   *
   * @return response()
   */

  otp_verify(serialNo,otp_value): Observable<any> {
  
    return this.httpClient.post(this.apiURL + environment.OtpVerify, {'otpValue':otp_value,'serialNo':serialNo}, this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  getvendorDetails(): Observable<any> {
    //console.log(this.httpOptions);
    return this.httpClient.get(this.apiURL + environment.GetvendorDetails,this.httpOptions)  
    .pipe(
      catchError(this.errorHandler)
    )
  }

fileUpload(file:any,body:any): Observable<any>{
  const formdata =new FormData()
  formdata.append("file",file)
  formdata.append("deviceModelId",body.deviceModelId)
  formdata.append("activeStatus",body.activeStatus)
  formdata.append("remarks",body.remarks)
  formdata.append("serverEnvironmentId",body.serverEnvironmentId)
  console.log(this.httpOptions1.Authorization)
  
  // const params=new HttpParams({
  //   fromObject:body
  // })  
  return this.httpClient.post(this.apiURL +environment.bulkInsertDeviceRegister,formdata,this.httpOptions1)  
    .pipe(
      catchError(this.errorHandler)
    )

}

urlconfig(form:any){
  return this.httpClient.post(this.apiURL +environment.urlConfiguration,form,this.httpOptions)  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  MCconfig(form:any){
    return this.httpClient.post(this.apiURL +environment.saveMcValidatingConfiguration,form,this.httpOptions)  
    .pipe(
      catchError(this.errorHandler)
    )
  
  } 
}
