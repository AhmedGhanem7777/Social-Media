import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Account {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  Login(loginData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Account/login`, { loginData });
  }

  CheckUserExist(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Account/exist-user`);
  }
}