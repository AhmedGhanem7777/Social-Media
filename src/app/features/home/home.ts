import { Component } from '@angular/core';
import { StoriesSection } from '../../shared/components/stories-section/stories-section';
import { PostCard } from '../../shared/components/post-card/post-card';
import { CreatePostCard } from '../../shared/components/create-post-card/create-post-card';
import { Post } from '../../core/models/post';

@Component({
  selector: 'app-home',
  imports: [StoriesSection, CreatePostCard, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly posts: Post[] = [
    {
      id: 1,
      user: {
        name: 'Sarah Ahmed',
        username: 'sarah_ahmed',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just finished an amazing sunset hike! The views were absolutely breathtaking 🌅✨ Nature never fails to amaze me.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      likes: 234, comments: 18, shares: 5, timeAgo: '2h', isLiked: true,
    },
    {
      id: 2,
      user: {
        name: 'Omar Hassan',
        username: 'omar_h',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      content: "Working on some exciting new projects! Can't wait to share more details soon. Stay tuned! 🚀\n\n#coding #development #tech",
      likes: 156, comments: 24, shares: 12, timeAgo: '4h',
    },
    {
      id: 3,
      user: {
        name: 'Layla Noor',
        username: 'layla_noor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Coffee and good vibes ☕️ Sometimes the simple moments are the best ones.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
      likes: 89, comments: 7, shares: 2, timeAgo: '6h', isSaved: true,
    },
    {
      id: 4,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },{
      id: 5,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },{
      id: 6,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },{
      id: 7,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },{
      id: 8,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },{
      id: 9,
      user: {
        name: 'Ahmed Khalil',
        username: 'ahmed_k',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      content: 'Just wrapped up an incredible team meeting. So grateful to work with such talented and passionate people! 💪\n\nTeamwork makes the dream work!',
      likes: 312, comments: 42, shares: 8, timeAgo: '8h', isLiked: true,
    },
  ];
}