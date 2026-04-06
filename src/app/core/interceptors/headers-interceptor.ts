import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  if (cookieService.check('token')) {
    req = req.clone({
      setHeaders: {
        Token: cookieService.get('token')
      }
    });
  }

  return next(req);
};
