import { afterNextRender, Component, ElementRef, inject, PLATFORM_ID, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/Language/language-service';
import { isPlatformBrowser } from '@angular/common';
interface Reel {
  id: number;
  user: { name: string; username: string; avatar: string };
  video: string;
  caption: string;
  likes: string;
  comments: string;
}

const reelsData: Reel[] = [
  {
    id: 1,
    user: { name: 'Sarah Ahmed', username: 'sarah_ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    video: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
    caption: 'Beautiful sunset vibes 🌅 #nature #travel',
    likes: '12.4K',
    comments: '234',
  },
  {
    id: 2,
    user: { name: 'Omar Hassan', username: 'omar_h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    video: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=800&fit=crop',
    caption: 'Adventure awaits! 🏔️ #mountains #hiking',
    likes: '8.9K',
    comments: '156',
  },
  {
    id: 3,
    user: { name: 'Layla Noor', username: 'layla_noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    video: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=800&fit=crop',
    caption: 'Chasing dreams ✨ #inspiration',
    likes: '23.1K',
    comments: '489',
  },
];
@Component({
  selector: 'app-reels',
  imports: [],
  templateUrl: './reels.html',
  styleUrl: './reels.css',
})
export class Reels {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  readonly lang = inject(LanguageService);

  // Template ref — signal-based (Angular 17+)
  readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  readonly reels = reelsData;
  readonly activeIndex = signal(0);
  readonly isMuted = signal(true);
  readonly isPlaying = signal(true);

  private likedReels = signal<Set<number>>(new Set());

  constructor() {
    // afterNextRender is SSR-safe: only runs in the browser after first render
    afterNextRender(() => {
      const el = this.scrollContainer()?.nativeElement;
      if (!el) return;

      el.addEventListener('scroll', () => {
        const newIndex = Math.round(el.scrollTop / el.clientHeight);
        if (newIndex !== this.activeIndex()) {
          this.activeIndex.set(newIndex);
          // Reset play state on new reel
          this.isPlaying.set(true);
        }
      }, { passive: true });
    });
  }

  isLiked(reelId: number): boolean {
    return this.likedReels().has(reelId);
  }

  toggleLike(reelId: number): void {
    this.likedReels.update(set => {
      const next = new Set(set);
      next.has(reelId) ? next.delete(reelId) : next.add(reelId);
      return next;
    });
  }

  togglePlay(): void { this.isPlaying.update(v => !v); }
  toggleMute(): void { this.isMuted.update(v => !v); }

  goBack(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
