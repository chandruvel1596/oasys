import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
// let access_token = localStorage.getItem('access_token');
// const httpOptions_new = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json',
//     'Accept'       : 'application/json',
//     'Authorization': `oasys ${access_token}`})
// };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIEndpoint = environment.APIEndpoint;
  private baseUrl=this.APIEndpoint; 

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + environment.LoginUrl,
      {
        userName,
        password,
      },
      httpOptions
    );
  }

  register(form:any): Observable<any> {
    return this.http.post(
      this.baseUrl + environment.register,
      
        form
      ,
      httpOptions
    ).pipe(
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

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

 
}