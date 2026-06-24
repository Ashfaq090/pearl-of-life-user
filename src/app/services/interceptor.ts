import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private readonly sharedService: SharedService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sharedService.userToken;

    req = req.clone({
      setHeaders: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          const redirectCheck = localStorage.getItem('register');
          if(redirectCheck && redirectCheck === 'register'){
            localStorage.removeItem('register');
            this.router.navigate(['/auth/register']);
          }
          this.router.navigate(['/auth/login']);
        }
        throw error;
      })
    );

    // return next.handle(req);
  }
}
