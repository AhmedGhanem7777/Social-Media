import { Component, inject, input, linkedSignal, signal, OnInit } from '@angular/core';
import { LanguageService } from '../../../core/services/Language/language-service';
import { Post } from '../../../core/models/post';
import { Comments } from '../comments/comments';
import { PostDatePipe } from '../../pipes/post-date-pipe';
import { REACTIONS } from '../../../core/models/reactions';
import { CommonModule } from '@angular/common';
import { Post as PostService } from '../../../core/services/Post/post';
import { SharePostModal } from '../share-post-modal/share-post-modal';
import { UserCommentedView } from '../../../core/models/user';
import { Comment } from '../../../core/services/Comment/comment';
import { UserListModal } from '../user-list-modal/user-list-modal';
import { Enum } from '../../../core/services/Enum/enum';


@Component({
  selector: 'app-post-card',
  imports: [Comments, PostDatePipe, CommonModule, SharePostModal, UserListModal],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard implements OnInit {
  readonly lang = inject(LanguageService);
  readonly postService = inject(PostService);
  readonly commentService = inject(Comment);
  readonly enumService = inject(Enum);
  readonly REACTIONS = REACTIONS;

  readonly post = input.required<Post>();

  // linkedSignal: initialised from input but locally writable
  isLiked = linkedSignal(() => this.post().isLikedByCurrentUser);
  selectedReaction = linkedSignal<number | null>(() => this.post().selectedReaction ?? (this.post().isLikedByCurrentUser ? 1 : null));
  isSaved = linkedSignal(() => this.post().isSaved ?? false);
  likeCount = linkedSignal(() => this.post().likesCount);
  commentsCount = linkedSignal(() => this.post().commentsCount);
  sharesCount = linkedSignal(() => this.post().sharesCount);

  showComments = signal(false);
  showMoreMenu = signal(false);
  showReactions = signal(false);
  showShareModal = signal(false);
  showUserCommentedModal = signal(false);
  userCommented = signal<UserCommentedView[]>([]);

  ngOnInit(): void {
    this.getUsersWhoCommented();
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

  handleLike(): void {
    if (this.selectedReaction()) {
      this.selectedReaction.set(null);
      this.isLiked.set(false);
      this.likeCount.set(this.likeCount() - 1);
    } else {
      this.selectedReaction.set(1); // Default to Like (1)
      this.isLiked.set(true);
      this.likeCount.set(this.likeCount() + 1);
    }
  }

  sharePost(caption: string = ''): void {
    this.postService.SharePost({ content: caption, postId: this.post().id }).subscribe({
      next: (res: any) => {
        console.log('share post', res);
        if (res.isSuccess) {
          this.sharesCount.set(res.data);
          this.showShareModal.set(false);
        }
      }, error: (err) => {
        console.log('share post error', err);
      }
    })
  }

  getUsersWhoCommented(): void {
    if (this.userCommented().length === 0) {
      this.commentService.GetUsersWhoCommented({ contentType: 1, contentId: this.post().id, pageIndex: 1, pageSize: 5 }).subscribe({
        next: (res: any) => {
          this.userCommented.set(res.data.data);
          // this.showUserCommentedModal.set(true);
        }, error: (err) => {
          console.log('users who commented error', err);
        }
      })
    } else {
      this.showUserCommentedModal.set(true);
    }
  }

  toggleUserCommentedModal() {
    this.showUserCommentedModal.set(true);
  }

  selectReaction(id: number): void {
    if (!this.selectedReaction()) {
      this.likeCount.set(this.likeCount() + 1);
    }
    this.selectedReaction.set(id);
    this.isLiked.set(true);
    this.showReactions.set(false);
  }

  getReactionById(id: number | null) {
    return this.enumService.reactionTypes().find(r => r.id === id);
  }

  toggleSaved(): void { this.isSaved.update(v => !v); }
  toggleComments(): void { this.showComments.update(v => !v); }
  toggleMoreMenu(): void { this.showMoreMenu.update(v => !v); }
  closeMoreMenu(): void { this.showMoreMenu.set(false); }
}
