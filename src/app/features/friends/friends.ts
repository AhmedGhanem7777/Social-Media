import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';
import { Friend as FriendService } from '../../core/services/Friend/friend';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { FriendData } from '../../core/models/friend';
import { FriendsTab } from '../../core/models/tab';

@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  readonly lang = inject(LanguageService);
  readonly friendService = inject(FriendService);
  readonly cookieService = inject(CookieService);
  private readonly route = inject(ActivatedRoute);

  activeTab = signal<FriendsTab>('all');
  searchQuery = signal('');

  readonly allFriends = signal<FriendData[]>([]);
  readonly friendRequests = signal<FriendData[]>([]);
  readonly suggestions = signal<FriendData[]>([]);
  readonly searchResults = signal<FriendData[]>([]);

  isLoading = signal(false);

  readonly tabs = [
    { id: 'all' as FriendsTab, label: this.lang.t('friends.allFriends'), badge: 0 },
    { id: 'requests' as FriendsTab, label: this.lang.t('friends.requests'), badge: this.friendRequests().length },
    { id: 'suggestions' as FriendsTab, label: this.lang.t('friends.suggestions'), badge: 0 },
  ];

  readonly filteredFriends = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const friends = this.allFriends();
    if (!q) return friends;
    return friends.filter(f =>
      f.displayName.toLowerCase().includes(q) ||
      f.username.toLowerCase().includes(q)
    );
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      const tab = params['tab'];
      if (q) {
        this.searchQuery.set(q);
        // this.SearchUsers(q);
      }
      if (tab) {
        this.activeTab.set((tab === 'search' ? 'all' : tab) as FriendsTab);
      }
    });

    this.GetMyFriends();
  }

  GetMyFriends(): void {
    this.friendService.GetFriends({ userId: this.cookieService.get('userId'), pageIndex: 1, pageSize: 20 }).subscribe({
      next: (res) => {
        console.log('My friends', res);
        if (res.isSuccess) {
          this.allFriends.set(res.data.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  GetPendingRequests(): void {
    this.friendService.GetPendingRequests({ pageIndex: 1, pageSize: 20 }).subscribe({
      next: (res) => {
        console.log('Pending requests', res);
        if (res.isSuccess) {
          this.friendRequests.set(res.data.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  GetSuggestedFriends(): void {
    this.friendService.GetSuggestedUsers({ pageIndex: 1, pageSize: 20 }).subscribe({
      next: (res) => {
        console.log('Suggested friends', res);
        if (res.isSuccess) {
          this.suggestions.set(res.data.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  unfriend(id: string): void {
    this.friendService.RemoveFriend(id).subscribe({
      next: (res) => {
        console.log('Unfriend response', res);
        if (res.isSuccess) {
          this.GetMyFriends();
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addFriend(id: string): void {
    console.log('Send Friend Request Id: ', id);

    this.friendService.SendFriendRequest(id).subscribe({
      next: (res) => {
        console.log('Add friend response', res);
        if (res.isSuccess) {
          this.GetSuggestedFriends();
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  acceptRequest(id: string): void {
    this.friendService.AcceptFriendRequest(id).subscribe({
      next: (res) => {
        console.log('Accept request response', res);
        if (res.isSuccess) {
          this.GetPendingRequests();
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  declineRequest(id: string): void {
    this.friendService.RejectFriendRequest(id).subscribe({
      next: (res) => {
        console.log('Decline request response', res);
        if (res.isSuccess) {
          this.GetPendingRequests();
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);

    if (query.length > 2) {
      // this.SearchUsers(query);
    } else {
      this.searchResults.set([]);
    }
  }

  // SearchUsers(query: string): void {
  //   if (!query.trim()) {
  //     this.searchResults.set([]);
  //     return;
  //   }

  //   this.isLoading.set(true);
  //   this.friendService.SearchUsers(query, { pageIndex: 1, pageSize: 20 }).subscribe({
  //     next: (res) => {
  //       if (res.isSuccess) {
  //         this.searchResults.set(res.data.data);
  //       }
  //       this.isLoading.set(false);
  //     },
  //     error: (err) => {
  //       console.error('Search error', err);
  //       this.isLoading.set(false);
  //     }
  //   });
  // }
}
