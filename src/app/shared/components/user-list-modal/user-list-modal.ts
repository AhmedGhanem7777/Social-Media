import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserCommentedView } from '../../../core/models/user';
import { LanguageService } from '../../../core/services/Language/language-service';

@Component({
  selector: 'app-user-list-modal',
  imports: [],
  templateUrl: './user-list-modal.html',
  styleUrl: './user-list-modal.css',
})
export class UserListModal {
  readonly lang = inject(LanguageService);
  readonly router = inject(Router);

  title = input<string>('Users');
  users = input.required<UserCommentedView[]>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }

  navigateToProfile(userId: string): void {
    this.router.navigate(['/profile', userId]);
    this.close.emit();
  }
}
