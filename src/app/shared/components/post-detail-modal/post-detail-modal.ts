import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { PostCard } from '../post-card/post-card';
import { LanguageService } from '../../../core/services/Language/language-service';
import { Post as PostService } from '../../../core/services/Post/post';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-post-detail-modal',
  imports: [PostCard],
  templateUrl: './post-detail-modal.html',
  styleUrl: './post-detail-modal.css',
})
export class PostDetailModal implements OnInit {
  readonly lang = inject(LanguageService);
  readonly postService = inject(PostService);

  postId = input.required<number>();
  type = input.required<'post' | 'reel'>();
  close = output<void>();
  item = signal<Post | null>(null);

  ngOnInit(): void {
    this.fetchItemDetails();
  }

  fetchItemDetails(): void {
    const id = this.postId();
    if (!id) return;

    this.postService.GetPostById(id).subscribe({
      next: (res) => {
        console.log('Specific Post', res);

        if (res.isSuccess) {
          this.item.set(res.data);
        }
      },
      error: (err) => console.error('Error fetching post details:', err)
    });
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.onClose();
    }
  }
}
