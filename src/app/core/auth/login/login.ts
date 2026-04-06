import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/Language/language-service';
import { ThemeService } from '../../services/Theme/theme-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly languageService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

  showPassword = signal(false);
  isLoading = signal(false);

  toggleShowPassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleLanguage(): void {
    this.languageService.setLanguage(
      this.languageService.language() === 'en' ? 'ar' : 'en'
    );
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}
