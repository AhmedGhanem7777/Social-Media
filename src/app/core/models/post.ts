export interface SharedPost {
    user: { name: string; username: string; avatar: string };
    content: string;
    image?: string;
    timeAgo: string;
}

export interface Post {
    commentsCount: number;
    content: string;
    contentUrl: string;
    createdAt: string;
    displayName: string;
    id: number;
    isLikedByCurrentUser: boolean;
    isShared: boolean;
    isViewedByCurrentUser: boolean;
    likesCount: number;
    profilePicture: string;
    sharedAt: string;
    sharedByDisplayName: string;
    sharedByProfilePicture: string;
    sharedByUserId: string;
    sharedCaption: string;
    sharesCount: number;
    userId: string;
    userName: string;
    isSaved?: boolean;
    selectedReaction?: number;
}

export interface PostData {
    userId: string
    pageIndex: number
    pageSize: number
}

export interface PostShareData {
    content: string;
    postId: number
}