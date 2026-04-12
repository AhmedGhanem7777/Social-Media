import { Component, signal } from '@angular/core';
import { StoriesSection } from '../../shared/components/stories-section/stories-section';
import { PostCard } from '../../shared/components/post-card/post-card';
import { CreatePostCard } from '../../shared/components/create-post-card/create-post-card';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Post } from '../../core/models/post';

@Component({
  selector: 'app-home',
  imports: [StoriesSection, CreatePostCard, PostCard, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // posts = signal<Post[]>([
  //   {
  //     id: 1,
  //     displayName: 'Sarah Ahmed',
  //     userName: 'sarah_ahmed',
  //     profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  //     content: 'Just finished an amazing sunset hike! The views were absolutely breathtaking 🌅✨ Nature never fails to amaze me.',
  //     contentUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  //     likesCount: 234, 
  //     commentsCount: 18, 
  //     sharesCount: 5, 
  //     createdAt: '2h', 
  //     isLikedByCurrentUser: true,
  //     isShared: false,
  //     isViewedByCurrentUser: true,
  //     userId: 'u1',
  //     sharedAt: '',
  //     sharedByDisplayName: '',
  //     sharedByProfilePicture: '',
  //     sharedByUserId: '',
  //     sharedCaption: ''
  //   },
  //   {
  //     id: 2,
  //     displayName: 'Sarah Ahmed',
  //     userName: 'sarah_ahmed',
  //     profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  //     content: 'Just finished an amazing sunset hike! The views were absolutely breathtaking 🌅✨ Nature never fails to amaze me.',
  //     contentUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  //     likesCount: 156, 
  //     commentsCount: 24, 
  //     sharesCount: 12, 
  //     createdAt: '2h', 
  //     isLikedByCurrentUser: false,
  //     isShared: true,
  //     isViewedByCurrentUser: true,
  //     userId: 'u1',
  //     postId: 1,
  //     sharedAt: '4h',
  //     sharedByDisplayName: 'Omar Hassan',
  //     sharedByProfilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  //     sharedByUserId: 'omar_h',
  //     sharedCaption: 'This view is incredible! 🔥'
  //   },
  //   {
  //     id: 3,
  //     displayName: 'Layla Noor',
  //     userName: 'layla_noor',
  //     profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  //     content: 'Coffee and good vibes ☕️ Sometimes the simple moments are the best ones.',
  //     contentUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  //     likesCount: 89, 
  //     commentsCount: 7, 
  //     sharesCount: 2, 
  //     createdAt: '6h', 
  //     isLikedByCurrentUser: false,
  //     isShared: false,
  //     isViewedByCurrentUser: true,
  //     userId: 'u3',
  //     sharedAt: '',
  //     sharedByDisplayName: '',
  //     sharedByProfilePicture: '',
  //     sharedByUserId: '',
  //     sharedCaption: '',
  //     isSavedByCurrentUser: true
  //   },
  //   {
  //     id: 4,
  //     displayName: 'Ahmed Khalil',
  //     userName: 'ahmed_k',
  //     profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  //     content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
  //     contentUrl: '',
  //     likesCount: 312, 
  //     commentsCount: 42, 
  //     sharesCount: 8, 
  //     createdAt: '8h', 
  //     isLikedByCurrentUser: true,
  //     isShared: false,
  //     isViewedByCurrentUser: true,
  //     userId: 'u4',
  //     sharedAt: '',
  //     sharedByDisplayName: '',
  //     sharedByProfilePicture: '',
  //     sharedByUserId: '',
  //     sharedCaption: ''
  //   },
  //   {
  //     id: 5,
  //     displayName: 'Ahmed Khalil',
  //     userName: 'ahmed_k',
  //     profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  //     content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
  //     contentUrl: '',
  //     likesCount: 45, 
  //     commentsCount: 3, 
  //     sharesCount: 1, 
  //     createdAt: '8h', 
  //     isLikedByCurrentUser: false,
  //     isShared: true,
  //     isViewedByCurrentUser: true,
  //     userId: 'u4',
  //     postId: 4,
  //     sharedAt: '9h',
  //     sharedByDisplayName: 'Layla Noor',
  //     sharedByProfilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  //     sharedByUserId: 'layla_noor',
  //     sharedCaption: 'So true! Teamwork really does make the dream work 🙌'
  //   },
  //   {
  //     id: 6,
  //     displayName: 'Ahmed Khalil',
  //     userName: 'ahmed_k',
  //     profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  //     content: 'Working on some exciting new projects! Can\'t wait to share more details soon. Stay tuned! 🚀\n\n#coding #development #tech',
  //     contentUrl: '',
  //     likesCount: 312, 
  //     commentsCount: 42, 
  //     sharesCount: 8, 
  //     createdAt: '10h', 
  //     isLikedByCurrentUser: true,
  //     isShared: false,
  //     isViewedByCurrentUser: true,
  //     userId: 'u4',
  //     sharedAt: '',
  //     sharedByDisplayName: '',
  //     sharedByProfilePicture: '',
  //     sharedByUserId: '',
  //     sharedCaption: ''
  //   },
  // ]);

  posts = signal<Post[]>([]);
  onPostDeleted(id: number): void {
    this.posts.update(posts => posts.filter(p => p.id !== id));
  }
}