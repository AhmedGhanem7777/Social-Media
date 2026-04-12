import { Component, inject, input, linkedSignal, OnInit, signal } from '@angular/core';
import { PostDatePipe } from '../../pipes/post-date-pipe';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/Language/language-service';
import { Comment } from '../../../core/models/comment';
import { REACTIONS } from '../../../core/models/reactions';
import { Comment as CommentService } from '../../../core/services/Comment/comment';
import { CommentInput } from '../comment-input/comment-input';
import { Enum } from '../../../core/services/Enum/enum';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-comment-item',
  imports: [CommonModule, PostDatePipe, CommentInput],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
})
export class CommentItem implements OnInit {
  readonly lang = inject(LanguageService);
  readonly commentService = inject(CommentService);
  readonly enumService = inject(Enum);
  readonly router = inject(Router);
  readonly REACTIONS = REACTIONS;

  readonly comment = input.required<Comment>();
  readonly postId = input.required<number>();
  readonly contentType = input.required<number>();
  readonly isReply = input<boolean>(false);

  isLiked = linkedSignal(() => this.comment().isLikedByCurrentUser);
  selectedReaction = linkedSignal<number | null>(() => this.comment().selectedReaction ?? (this.comment().isLikedByCurrentUser ? 1 : null));
  likesCount = linkedSignal(() => this.comment().likesCount);

  showReplies = signal(false);
  showReactions = signal(false);
  showReplyInput = signal(false);
  replies = signal<Comment[]>([]);

  ngOnInit(): void {
    // this.getRepliesForComment();
    this.getReactionTypes();
  }

  getReactionTypes(): void {
    if (this.enumService.reactionTypes().length === 0 || this.enumService.reactionTypes() === REACTIONS) {
      this.enumService.GetReactionTypes().subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            const mappedReactions = res.data.map((backendReaction: { id: number; name: string }) => {
              const metadata = REACTIONS.find(r => r.id === backendReaction.id);
              return {
                id: backendReaction.id,
                name: metadata?.name || backendReaction.name,
                emoji: metadata?.emoji,
                color: metadata?.color
              };
            });
            this.enumService.reactionTypes.set(mappedReactions);
          }
        }, error: (err) => {
          console.log(err);
        }
      })
    }
  }

  getRepliesForComment(commentId: number, forceShow: boolean = false): void {
    this.commentService.GetRepliesForComment({ commentId: commentId, pageIndex: 1, pageSize: 3 }).subscribe({
      next: (res: any) => {
        console.log('replies: ', res);
        if (res.isSuccess) {
          if (forceShow) {
            this.showReplies.set(true);
          } else {
            this.showReplies.update(v => !v);
          }
          this.replies.set(res.data.data);
        }
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  navigateToProfile(userId: string): void {
    if (userId) {
      this.router.navigate(['/profile', userId]);
    }
  }

  toggleReplies(): void {
    this.showReplies.update(v => !v);
  }

  handleLike(): void {
    if (this.selectedReaction()) {
      this.selectedReaction.set(null);
      this.isLiked.set(false);
      this.likesCount.set(this.likesCount() - 1);
    } else {
      this.selectedReaction.set(1); // Default to Like (1)
      this.isLiked.set(true);
      this.likesCount.set(this.likesCount() + 1);
    }
  }

  selectReaction(id: number): void {
    if (!this.selectedReaction()) {
      this.likesCount.set(this.likesCount() + 1);
    }
    this.selectedReaction.set(id);
    this.isLiked.set(true);
    this.showReactions.set(false);
  }

  handleReplySubmit(text: string): void {
    this.commentService.CreateComment({
      contentId: this.postId(), contentType: this.contentType(), text: text, parentCommentId: this.comment().id
    }).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.showReplyInput.set(false);
          this.getRepliesForComment(this.comment().id, true);
        }
      },
      error: (err) => console.log(err)
    });
  }

  getReactionById(id: number | null) {
    return this.enumService.reactionTypes().find(r => r.id === id);
  }
}
