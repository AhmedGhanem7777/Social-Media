import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  getUserProfile(userId: string) {
    return this.httpClient.get(`${this.baseUrl}/api/User/profile/${userId}`);
  }

  updateUserProfile(payload: FormData | Record<string, unknown>) {
    return this.httpClient.put(`${this.baseUrl}/api/User/me`, payload);
  }

  updateLinks(socialLinks: { platform: number; url: string }[]) {
    return this.httpClient.put(`${this.baseUrl}/api/User/me/social-links`, socialLinks);
  }
}
