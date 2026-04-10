import { NgSwitch } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/Language/language-service';
import { BottomNavItem } from '../../../core/models/navItem';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, NgSwitch],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNav {
  readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  currentUserId = signal<string>(this.cookieService.get("userId"))

  readonly navItems: BottomNavItem[] = [
    { path: '/', label: 'nav.home' },
    { path: '/reels', label: 'nav.reels' },
    { path: '/create', label: 'feed.post', isCreate: true },
    { path: '/chat', label: 'nav.chat' },
    { path: `/profile`, label: 'nav.profile' },
  ];

  getLink(item: BottomNavItem) {
    return item.path === '/profile' ? [item.path, this.currentUserId] : [item.path];
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
