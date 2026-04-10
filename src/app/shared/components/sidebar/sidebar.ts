import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/Language/language-service';
import { SidebarNavItem } from '../../../core/models/navItem';
import { SuggestedUser } from '../../../core/models/user';
import { Friend } from '../../../core/services/Friend/friend';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly friendService = inject(Friend);
  private readonly cookieService = inject(CookieService);

  readonly mainNavItems: SidebarNavItem[] = [
    { path: '/', icon: 'home', label: 'nav.feed' },
    { path: '/reels', icon: 'film', label: 'nav.reels' },
    { path: '/chat', icon: 'message', label: 'nav.chat' },
    { path: `/profile/${this.cookieService.get("userId")}`, icon: 'user', label: 'nav.profile' },
  ];

  readonly secondaryNavItems: SidebarNavItem[] = [
    { path: '/saved', icon: 'bookmark', label: 'nav.saved' },
    { path: '/friends', icon: 'users', label: 'profile.friends' },
    { path: '/settings', icon: 'settings', label: 'nav.settings' },
  ];

  suggestedUsers = signal<SuggestedUser[]>([]);

  ngOnInit(): void {
    this.GetSuggestedUsers();
  }

  GetSuggestedUsers(): void {
    this.friendService.GetSuggestedUsers({ pageIndex: 1, pageSize: 20 }).subscribe({
      next: (users) => {
        if (users.isSuccess) {
          console.log(users);

          this.suggestedUsers.set(users.data.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
