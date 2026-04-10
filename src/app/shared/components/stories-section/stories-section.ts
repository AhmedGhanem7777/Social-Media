import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/Language/language-service';
import { Story } from '../../../core/models/story';

@Component({
  selector: 'app-stories-section',
  imports: [],
  templateUrl: './stories-section.html',
  styleUrl: './stories-section.css',
})
export class StoriesSection {
  readonly lang = inject(LanguageService);
  readonly stories: Story[] = [
    { id: 0, username: 'Your Story', avatar: null, hasUnseenStory: false, isOwnStory: true },
    { id: 1, username: 'sarah_ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', hasUnseenStory: true },
    { id: 2, username: 'omar_h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', hasUnseenStory: true },
    { id: 3, username: 'layla_noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', hasUnseenStory: true },
    { id: 4, username: 'ahmed_k', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', hasUnseenStory: true },
    { id: 5, username: 'fatima_z', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', hasUnseenStory: false },
    { id: 6, username: 'yusuf_m', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', hasUnseenStory: true },
    { id: 7, username: 'nadia_r', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', hasUnseenStory: false },
  ];

  storyRingClass(story: Story): string {
    if (story.hasUnseenStory) return 'bg-gradient-story story-ring-animated';
    if (story.isOwnStory) return 'bg-border';
    return 'bg-muted';
  }
}
