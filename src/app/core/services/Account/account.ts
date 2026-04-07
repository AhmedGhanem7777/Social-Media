import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginData, RegisterData } from '../../models/account';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Account {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly baseUrl = environment.baseUrl;

  Login(loginData: LoginData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Account/login`, loginData);
  }

  Register(registerData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Account/register`, registerData);
  }

  CheckUserExist(identifier: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Account/exist-user/${identifier}`);
  }
}