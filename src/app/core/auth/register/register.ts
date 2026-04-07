import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/Language/language-service';
import { ThemeService } from '../../services/Theme/theme-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private platformId = inject(PLATFORM_ID);

  readonly languageService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  avatarPreview = signal<string | null>(null);

  toggleShowPassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  toggleLanguage(): void {
    this.languageService.setLanguage(
      this.languageService.language() === 'en' ? 'ar' : 'en'
    );
  }

  onFileSelected(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarPreview.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}
