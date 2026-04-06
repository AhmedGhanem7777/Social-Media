import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/Language/language-service';
import { SidebarNavItem } from '../../../core/models/navItem';
import { SuggestedUser } from '../../../core/models/user';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly lang = inject(LanguageService);
  private readonly router = inject(Router);

  readonly mainNavItems: SidebarNavItem[] = [
    { path: '/', icon: 'home', label: 'nav.feed' },
    { path: '/reels', icon: 'film', label: 'nav.reels' },
    { path: '/chat', icon: 'message', label: 'nav.chat' },
    { path: '/profile', icon: 'user', label: 'nav.profile' },
  ];

  readonly secondaryNavItems: SidebarNavItem[] = [
    { path: '/saved', icon: 'bookmark', label: 'nav.saved' },
    { path: '/friends', icon: 'users', label: 'profile.friends' },
    { path: '/settings', icon: 'settings', label: 'nav.settings' },
  ];

  readonly suggestedUsers: SuggestedUser[] = [
    { id: 1, name: 'Sarah Ahmed', username: '@sarah_a', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    { id: 2, name: 'Omar Hassan', username: '@omar_h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 3, name: 'Layla Noor', username: '@layla_n', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
