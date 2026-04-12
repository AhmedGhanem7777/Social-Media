export interface SharedPost {
    user: { name: string; username: string; avatar: string };
    content: string;
    image?: string;
    timeAgo: string;
}

export interface Post {
    id: number;
    content: string;
    contentUrl: string;

    createdAt: string;

    commentsCount: number;
    likesCount: number;
    savesCount: number;
    sharesCount: number;

    isLikedByCurrentUser: boolean;
    isSavedByCurrentUser: boolean;
    isViewedByCurrentUser: boolean;

    reactionType: string | null;
    reactions: ReactionSummary[]

    userId: string;
    userName: string;
    displayName: string;
    profilePicture: string;

    isShared: boolean;

    sharedAt?: string;
    sharedByUserId?: string;
    sharedByDisplayName?: string;
    sharedByProfilePicture?: string;
    sharedCaption?: string;
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

export interface ReactionSummary {
    reactionType: string;
    count: number;
}