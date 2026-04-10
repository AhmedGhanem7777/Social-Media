import { Component, inject, input, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment, CreateCommentRequest } from '../../../core/models/comment';
import { CommentItem } from '../comment-item/comment-item';
import { Comment as CommentService } from '../../../core/services/Comment/comment';
import { LanguageService } from '../../../core/services/Language/language-service';
import { CommentInput } from '../comment-input/comment-input';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, CommentItem, CommentInput],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments implements OnInit {
  private readonly commentService = inject(CommentService);
  readonly lang = inject(LanguageService);

  postId = input.required<number>();
  contentType = input.required<number>();
  selectedComments = signal<Comment[]>([]);
  commentCountChange = output<number>();

  ngOnInit(): void {
    this.getCommentsForPost();
  }

  getCommentsForPost(): void {
    this.commentService.GetCommentsForContent({ contentType: this.contentType(), contentId: this.postId(), pageIndex: 1, pageSize: 5 }).subscribe({
      next: (res: any) => {
        console.log('Comments: ', res);
        this.selectedComments.set(res.data.data);

      }, error: (err) => {
        console.log(err);

      }
    })
  }

  handleCommentSubmit(text: string): void {
    const commentData: CreateCommentRequest = {
      contentId: this.postId(),
      contentType: this.contentType(),
      text: text.trim(),
      parentCommentId: null
    };

    this.createComment(commentData);
  }

  createComment(commentData: CreateCommentRequest): void {
    this.commentService.CreateComment(commentData).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          console.log('Comment created successfully', res);
          this.commentCountChange.emit(res.data);
          this.getCommentsForPost();
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
