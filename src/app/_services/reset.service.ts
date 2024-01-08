import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  APIEndpoint = environment.APIEndpoint;
  private apiURL=this.APIEndpoint;
  public api_key:any;
  httpOptions:any;
  username=localStorage.getItem('userName');

  constructor(private storageService: StorageService, private httpClient:HttpClient) {

    this.api_key = this.storageService.getUser().token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.api_key}`
      })
    }

   }

   changePassword(password): Observable<any> {
    console.log(this.username)
    const params = new HttpParams()
    .set('username', this.username)
    .set('newPassword', password);
    return this.httpClient.post(this.apiURL + environment.changePassword,null,{params, headers: this.httpOptions.headers})
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
