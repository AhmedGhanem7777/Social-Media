import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { LanguageService } from '../../../core/services/Language/language-service';
import { PostUser } from '../../../core/models/postUser';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  readonly lang = inject(LanguageService);

  readonly user = input.required<PostUser>();
  readonly content = input.required<string>();
  readonly image = input<string | undefined>(undefined);
  readonly likes = input.required<number>();
  readonly comments = input.required<number>();
  readonly shares = input.required<number>();
  readonly timeAgo = input.required<string>();

  // Aliased inputs so the parent passes isLiked / isSaved
  readonly initialIsLiked = input(false, { alias: 'isLiked' });
  readonly initialIsSaved = input(false, { alias: 'isSaved' });

  // linkedSignal: initialised from input but locally writable
  isLiked = linkedSignal(() => this.initialIsLiked());
  isSaved = linkedSignal(() => this.initialIsSaved());
  likeCount = linkedSignal(() => this.likes());

  showComments = signal(false);
  showMoreMenu = signal(false);

  handleLike(): void {
    const liked = this.isLiked();
    this.isLiked.set(!liked);
    this.likeCount.set(liked ? this.likeCount() - 1 : this.likeCount() + 1);
  }

  toggleSaved(): void { this.isSaved.update(v => !v); }
  toggleComments(): void { this.showComments.update(v => !v); }
  toggleMoreMenu(): void { this.showMoreMenu.update(v => !v); }
  closeMoreMenu(): void { this.showMoreMenu.set(false); }
}
