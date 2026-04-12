import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';
import { Tab } from '../../core/models/tab';
import { User } from '../../core/services/User/user';
import { CookieService } from 'ngx-cookie-service';
import { UserProfile } from '../../core/models/user';
import { DatePipe } from '@angular/common';
import { Enum } from '../../core/services/Enum/enum';
import { Platform } from '../../core/models/enum';
import { Post as PostService } from '../../core/services/Post/post';
import { Post } from '../../core/models/post';
import { Friend } from '../../core/services/Friend/friend';
import { FriendData } from '../../core/models/friend';
import { ActivatedRoute } from '@angular/router';
import { PostCard } from '../../shared/components/post-card/post-card';
import { Save } from '../../core/services/SaveItem/save';
import { SaveRequest } from '../../core/models/save';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, PostCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  readonly lang = inject(LanguageService);
  readonly userService = inject(User);
  readonly cookieService = inject(CookieService);
  readonly enumService = inject(Enum);
  readonly postService = inject(PostService);
  readonly friendService = inject(Friend);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly saveService = inject(Save);

  activeTab = signal<Tab>('posts');
  userId = signal<string>('');

  profileData = signal<UserProfile | null>(null)
  plateforms = signal<Platform[]>([])
  profilePosts = signal<Post[]>([])
  friends = signal<FriendData[]>([])

  ngOnInit(): void {
    this.getUserId()
    this.getSocialPlateforms()
  }

  getUserId() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.userId.set(id);
        console.log("userrrrrrrrrrID", this.userId());

        // Fetch data for the new user
        this.getProfileData();
        this.getUserPosts();
        this.getFrindsForSpecificUser();
      }
    });
  }

  getProfileData(): void {
    this.userService.getUserProfile(this.userId()).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          console.log(res);
          this.profileData.set(res.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getSocialPlateforms(): void {
    this.enumService.GetSocialPlatforms().subscribe({
      next: (res) => {
        this.plateforms.set(res)
        console.log(this.plateforms());
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  getUserPosts(): void {
    this.postService.GetPostsForSpecificUser({ pageIndex: 1, pageSize: 10, userId: this.userId() }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.profilePosts.set(res.data.data);
          console.log('Posts', res.data.data);
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getFrindsForSpecificUser(): void {
    this.friendService.GetFriends({ pageIndex: 1, pageSize: 5 }).subscribe({
      next: (res) => {
        console.log('Friends', res.data.data);
        this.friends.set(res.data.data)
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  readonly stats = computed(() => [
    { label: this.lang.t('profile.posts'), value: this.profileData()?.postsCount },
    { label: this.lang.t('profile.followers'), value: this.profileData()?.followersCount },
    { label: this.lang.t('profile.following'), value: this.profileData()?.followingCount },
  ]);

  readonly tabs = computed(() => [
    { id: 'posts' as Tab, label: this.lang.t('profile.posts') },
    { id: 'friends' as Tab, label: this.lang.t('profile.friends') },
  ]);
}
