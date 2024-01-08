import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { LoaderService } from '../service/loader.service';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderservice:LoaderService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('/login/checkUser')){
      return next.handle(request);
      
    }
      this.loaderservice.show();
  

    

    // Start measuring time
    const startTime = new Date().getTime();

    return next.handle(request).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {  
          setTimeout(() => {
            alert('Network Error: ' + error.status);
            this.router.navigate(['auth']);
          }, 700);
          return throwError(error);
        }
      }
      return throwError(error);
    }),
      switchMap((event) => {
        // Calculate request duration
        const endTime = new Date().getTime();
        const requestDuration = endTime - startTime;

        // Set a minimum duration of 1000 milliseconds (1 second)
        const minDuration = 1000;

        // Determine the delay based on the request duration
        const delay = requestDuration < 500 ? minDuration : 0;

        return timer(delay).pipe(
          switchMap(() => {
            this.loaderservice.hide()
              this.loaderservice.animateEmitter.emit(true)
            return [event];
          })
        );
       
      })
    );
  }
//   if(request.url.includes('/login/checkUser')) {
//     return next.handle(request);
//   }

//   this.loaderservice.show();
//   const startTime = new Date().getTime();

//   return next.handle(request).pipe(
//     catchError((error: any) => {
//       if (error instanceof HttpErrorResponse) {
//         if (error.status === 403) {
//           this.loaderservice.hide();    
//           setTimeout(() => {
//             alert('Network Error: ' + error.status);
//             this.router.navigate(['']);
//           }, 500);
//           return throwError(error);
//         }
//       }
//       return throwError(error);
//     }),
//     finalize(() => {
//       const endTime = new Date().getTime();
//       const requestDuration = endTime - startTime;
//       const minDuration = 1000;
//       const delay = requestDuration < 500 ? minDuration : 0;

//       setTimeout(() => {
//         this.loaderservice.hide();
//         this.loaderservice.animateEmitter.emit(true);
//       }, delay);
//     })
//   );
// }
  }


