import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const lang = localStorage.getItem('lang') || 'en';

  req = req.clone({
    setHeaders: {
      'Accept-Language': lang,
      ...(cookieService.check('token') && { Token: cookieService.get('token') }),
    }
  });

  return next(req);
};