import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';

@Pipe({
  name: 'postDate',
  standalone: true
})
export class PostDatePipe implements PipeTransform {
  private lang = inject(LanguageService);

  transform(value: string | Date | undefined | null): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return this.lang.t('time.now');
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}${this.lang.t('time.minute')}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}${this.lang.t('time.hour')}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}${this.lang.t('time.day')}`;
    }

    // Longer than 7 days, return formatted date
    return date.toLocaleDateString(this.lang.language(), {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}
