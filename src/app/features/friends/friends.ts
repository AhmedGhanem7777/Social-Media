import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';
type FriendsTab = 'all' | 'requests' | 'suggestions';

interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  isOnline?: boolean;
}

interface FriendRequest {
  id: number;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  timeAgo: string;
}

const allFriends: Friend[] = [
  { id: 1, name: 'Sarah Ahmed', username: '@sarah_ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', mutualFriends: 12, isOnline: true },
  { id: 2, name: 'Omar Hassan', username: '@omar_h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', mutualFriends: 8, isOnline: true },
  { id: 3, name: 'Layla Noor', username: '@layla_noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', mutualFriends: 5, isOnline: false },
  { id: 4, name: 'Ahmed Khalil', username: '@ahmed_k', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', mutualFriends: 20, isOnline: true },
  { id: 5, name: 'Fatima Zahra', username: '@fatima_z', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', mutualFriends: 3, isOnline: false },
  { id: 6, name: 'Yusuf Mohamed', username: '@yusuf_m', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', mutualFriends: 7, isOnline: false },
  { id: 7, name: 'Nadia Rahman', username: '@nadia_r', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', mutualFriends: 15, isOnline: true },
  { id: 8, name: 'Khalid Ali', username: '@khalid_ali', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', mutualFriends: 2, isOnline: false },
];

const friendRequests: FriendRequest[] = [
  { id: 1, name: 'Mona Sherif', username: '@mona_s', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', mutualFriends: 4, timeAgo: '2h' },
  { id: 2, name: 'Hassan Adel', username: '@hassan_a', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', mutualFriends: 9, timeAgo: '1d' },
  { id: 3, name: 'Rania Mostafa', username: '@rania_m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', mutualFriends: 11, timeAgo: '3d' },
];

const suggestions: Friend[] = [
  { id: 10, name: 'Karim Saad', username: '@karim_s', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', mutualFriends: 6 },
  { id: 11, name: 'Dina Fawzy', username: '@dina_f', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', mutualFriends: 13 },
  { id: 12, name: 'Tarek Nour', username: '@tarek_n', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', mutualFriends: 1 },
  { id: 13, name: 'Iman Helal', username: '@iman_h', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', mutualFriends: 8 },
  { id: 14, name: 'Ziad Ramadan', username: '@ziad_r', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', mutualFriends: 3 },
  { id: 15, name: 'Salma Gamal', username: '@salma_g', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', mutualFriends: 17 },
];
@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {
  readonly lang = inject(LanguageService);

  activeTab = signal<FriendsTab>('all');
  searchQuery = signal('');

  readonly allFriends = allFriends;
  readonly friendRequests = friendRequests;
  readonly suggestions = suggestions;

  readonly tabs = [
    { id: 'all' as FriendsTab, label: this.lang.t('friends.allFriends'), badge: 0 },
    { id: 'requests' as FriendsTab, label: this.lang.t('friends.requests'), badge: friendRequests.length },
    { id: 'suggestions' as FriendsTab, label: this.lang.t('friends.suggestions'), badge: 0 },
  ];

  readonly filteredFriends = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allFriends;
    return this.allFriends.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.username.toLowerCase().includes(q)
    );
  });

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  acceptRequest(id: number): void { console.log('Accept request', id); }
  declineRequest(id: number): void { console.log('Decline request', id); }
  unfriend(id: number): void { console.log('Unfriend', id); }
  addFriend(id: number): void { console.log('Add friend', id); }
  removeSuggestion(id: number): void { console.log('Remove suggestion', id); }
}
