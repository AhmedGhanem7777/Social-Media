import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/Language/language-service';

@Component({
  selector: 'app-create-post-card',
  imports: [],
  templateUrl: './create-post-card.html',
  styleUrl: './create-post-card.css',
})
export class CreatePostCard {
  readonly lang = inject(LanguageService);
}
