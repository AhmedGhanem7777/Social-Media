import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/Theme/theme-service';
import { LanguageService } from '../../../core/services/Language/language-service';
import { NavItem } from '../../../core/models/navItem';
import { Account } from '../../../core/services/Account/account';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly lang = inject(LanguageService);
  readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly accountService = inject(Account);
  private readonly cookieService = inject(CookieService);

  showProfileMenu = signal(false);

  readonly navItems: NavItem[] = [
    { path: '/', icon: 'home', label: 'nav.home' },
    { path: '/reels', icon: 'film', label: 'nav.reels' },
    { path: '/chat', icon: 'message', label: 'nav.chat' },
  ];

  // Method to handle user logout
  LogOut(): void {
    this.showProfileMenu.set(false);
  }

  // Method to check if a nav item is active based on the current route
  isActive(path: string): boolean {
    return this.router.url === path;
  }

  // Method to toggle the theme of the application
  toggleLanguage(): void {
    this.lang.setLanguage(this.lang.language() === 'en' ? 'ar' : 'en');
  }

  // Method to toggle the theme of the application
  toggleProfileMenu(): void {
    this.showProfileMenu.update(v => !v);
  }

  closeProfileMenu(): void {
    this.showProfileMenu.set(false);
  }
}
