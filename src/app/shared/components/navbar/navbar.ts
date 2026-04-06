import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/Theme/theme-service';
import { LanguageService } from '../../../core/services/Language/language-service';
import { NavItem } from '../../../core/models/navItem';

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

  showProfileMenu = signal(false);

  readonly navItems: NavItem[] = [
    { path: '/', icon: 'home', label: 'nav.home' },
    { path: '/reels', icon: 'film', label: 'nav.reels' },
    { path: '/chat', icon: 'message', label: 'nav.chat' },
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleLanguage(): void {
    this.lang.setLanguage(this.lang.language() === 'en' ? 'ar' : 'en');
  }

  toggleProfileMenu(): void { this.showProfileMenu.update(v => !v); }
  closeProfileMenu(): void { this.showProfileMenu.set(false); }
}
