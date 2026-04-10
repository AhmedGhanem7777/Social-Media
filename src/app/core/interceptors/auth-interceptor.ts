import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, switchMap, throwError, Subject, filter, take } from 'rxjs';
import { Account } from '../services/Account/account';
import { Router } from '@angular/router';

let isRefreshing = false;
let refreshTokenSubject = new Subject<string | null>();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authService = inject(Account);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Skip token refresh for auth endpoints to avoid infinite loops
      if (
        error.status === 401 &&
        !req.url.includes('/refreshToken') &&
        !req.url.includes('/revokeToken') &&
        !req.url.includes('/login')
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject = new Subject<string | null>();

          return authService.RefreshToken().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              console.log('res: refreshTokenSubject', res);


              const newToken = res.data.token;

              // Save new JWT in cookie
              cookieService.set('token', newToken);

              // Notify queued requests
              refreshTokenSubject.next(newToken);
              refreshTokenSubject.complete();

              // Retry original request with new token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                },
                withCredentials: true
              });

              return next(retryReq);
            }),
            catchError(err => {
              isRefreshing = false;
              refreshTokenSubject.next(null);
              refreshTokenSubject.complete();

              // Refresh failed → clear auth data & redirect to login
              authService.clearAuthData();
              router.navigate(['/login']);

              return throwError(() => err);
            })
          );
        } else {
          // Another refresh is in progress — queue this request
          return refreshTokenSubject.pipe(
            filter((newToken): newToken is string => newToken !== null),
            take(1),
            switchMap(newToken => {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                },
                withCredentials: true
              });
              return next(retryReq);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
