import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Pagination } from '../../models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class Feed {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  GetFeedReels(pagination: Pagination): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Feed/reels?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`);
  }

  GetFeedStories(pagination: Pagination): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Feed/stories?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`);
  }

  GetFeedPosts(pagination: Pagination): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/Feed/posts?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`);
  }
}
