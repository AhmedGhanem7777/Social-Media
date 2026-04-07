import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/Language/language-service';
import { ThemeService } from '../../services/Theme/theme-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  readonly languageService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

  isLoading = signal(false);
  emailSent = signal(false);

  toggleLanguage(): void {
    this.languageService.setLanguage(
      this.languageService.language() === 'en' ? 'ar' : 'en'
    );
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.emailSent.set(true);
    }, 2000);
  }

  resend(): void {
    this.emailSent.set(false);
  }
}
