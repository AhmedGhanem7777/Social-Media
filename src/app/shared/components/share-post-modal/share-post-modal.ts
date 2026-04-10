import { Component, inject, input, output, signal } from '@angular/core';
import { PostDatePipe } from '../../pipes/post-date-pipe';
import { LanguageService } from '../../../core/services/Language/language-service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-share-post-modal',
  imports: [PostDatePipe],
  templateUrl: './share-post-modal.html',
  styleUrl: './share-post-modal.css',
})
export class SharePostModal {
  readonly lang = inject(LanguageService);

  post = input.required<Post>();
  close = output<void>();
  share = output<string>();

  caption = signal('');

  onCaptionInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.caption.set(target.value);
  }

  onShare(): void {
    this.share.emit(this.caption());
  }

  onClose(): void {
    this.close.emit();
  }
}
