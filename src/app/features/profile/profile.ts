import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';

type Tab = 'posts' | 'saved' | 'friends';

const profilePosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', likes: 234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', likes: 189 },
  { id: 3, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop', likes: 312 },
  { id: 4, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop', likes: 156 },
  { id: 5, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop', likes: 278 },
  { id: 6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', likes: 445 },
];

const friends = [
  { id: 1, name: 'Sarah Ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  { id: 2, name: 'Omar Hassan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: 3, name: 'Layla Noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  { id: 4, name: 'Ahmed Khalil', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  { id: 5, name: 'Fatima Zahra', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
  { id: 6, name: 'Yusuf Mohamed', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
];
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  readonly lang = inject(LanguageService);

  activeTab = signal<Tab>('posts');

  readonly profilePosts = profilePosts;
  readonly savedPosts = profilePosts.slice(0, 3);
  readonly friends = friends;

  readonly stats = [
    { label: this.lang.t('profile.posts'), value: '156' },
    { label: this.lang.t('profile.followers'), value: '12.4K' },
    { label: this.lang.t('profile.following'), value: '892' },
  ];

  readonly tabs = [
    { id: 'posts' as Tab, label: this.lang.t('profile.posts') },
    { id: 'saved' as Tab, label: 'Saved' },
    { id: 'friends' as Tab, label: this.lang.t('profile.friends') },
  ];
}
