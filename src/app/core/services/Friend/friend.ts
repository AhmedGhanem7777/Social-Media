import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Pagination } from '../../models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class Friend {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  GetSuggestedUsers(paging: Pagination): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Friends/suggestions?PageIndex=${paging.pageIndex}&PageSize=${paging.pageSize}`);
  }

  GetFriends(paging: Pagination): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Friends?PageIndex=${paging.pageIndex}&PageSize=${paging.pageSize}`)
  }
}
