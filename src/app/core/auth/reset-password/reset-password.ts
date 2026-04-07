import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/Theme/theme-service';
import { LanguageService } from '../../services/Language/language-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  readonly languageService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

  readonly otpIndices = [0, 1, 2, 3, 4, 5];

  isLoading = signal(false);
  resetSuccess = signal(false);
  showPassword = signal(false);
  resendCooldown = signal(0);

  private _password = '';
  passwordStrength = signal(0);

  toggleShowPassword(): void { this.showPassword.update(v => !v); }
  toggleLanguage(): void {
    this.languageService.setLanguage(
      this.languageService.language() === 'en' ? 'ar' : 'en'
    );
  }

  // ── OTP helpers ──────────────────────────────────────────────────────────
  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    // Keep only digits
    input.value = input.value.replace(/\D/g, '').slice(0, 1);
    // Move focus forward
    if (input.value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      next?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prev?.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    digits.forEach((digit, i) => {
      const input = document.getElementById(`otp-${i}`) as HTMLInputElement | null;
      if (input) input.value = digit;
    });
    // Focus last filled box
    const last = document.getElementById(`otp-${Math.min(digits.length - 1, 5)}`);
    (last as HTMLInputElement | null)?.focus();
  }

  // ── Password strength ─────────────────────────────────────────────────────
  onPasswordInput(event: Event): void {
    this._password = (event.target as HTMLInputElement).value;
    this.passwordStrength.set(this.calcStrength(this._password));
  }

  private calcStrength(pw: string): number {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  strengthColor(): string {
    const map: Record<number, string> = {
      1: 'bg-red-500', 2: 'bg-orange-500', 3: 'bg-yellow-500', 4: 'bg-green-500',
    };
    return map[this.passwordStrength()] ?? 'bg-muted';
  }

  strengthTextColor(): string {
    const map: Record<number, string> = {
      1: 'text-red-500', 2: 'text-orange-500', 3: 'text-yellow-500', 4: 'text-green-500',
    };
    return map[this.passwordStrength()] ?? '';
  }

  strengthLabel(): string {
    const map: Record<number, string> = {
      1: this.languageService.t('auth.strengthWeak'),
      2: this.languageService.t('auth.strengthFair'),
      3: this.languageService.t('auth.strengthGood'),
      4: this.languageService.t('auth.strengthStrong'),
    };
    return map[this.passwordStrength()] ?? '';
  }

  // ── Resend OTP with 30s cooldown ─────────────────────────────────────────
  resendOtp(): void {
    this.resendCooldown.set(30);
    const interval = setInterval(() => {
      this.resendCooldown.update(v => {
        if (v <= 1) { clearInterval(interval); return 0; }
        return v - 1;
      });
    }, 1000);
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.resetSuccess.set(true);
    }, 2000);
  }
}
