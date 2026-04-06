export interface Post {
    id: number;
    user: { name: string; username: string; avatar: string };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    timeAgo: string;
    isLiked?: boolean;
    isSaved?: boolean;
}