import { SocialMedia } from "./enum";

export interface SuggestedUser {
    userId: string;
    displayName: string;
    username: string;
    profilePicture: string;
    mutualFriends: number;
}

export interface UserProfile {
    address: {
        city: string
        country: string
    };
    bio: string;
    coverPicture: string;
    displayName: string;
    username: string;
    createdAt: string;
    profilePicture: string;
    socialLinks: SocialMedia[];
    postsCount: number;
    followersCount: number
    followingCount: number
}

export interface UserCommented {
    contentType: number;
    contentId: number;
    pageIndex: number;
    pageSize: number;
}

export interface UserCommentedView {
    userId: string;
    displayName: string;
    profilePicture: string;
}
