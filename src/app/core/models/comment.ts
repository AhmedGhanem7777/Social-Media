import { ReactionSummary } from "./post"

// export interface Comment {
//     id: number;
//     userId: string;
//     userName: string;
//     avatar: string | null;
//     content: string;
//     createdAt: string;
//     likesCount: number;
//     isLikedByCurrentUser: boolean;
//     selectedReaction?: number;
//     replies?: Comment[];
//     showReplies?: boolean;
// }

export interface Comment {
    id: number
    content: string
    createdAt: string
    displayName: string
    isLikedByCurrentUser: boolean
    likesCount: number
    parentCommentId: number | null
    profilePicture: string
    repliesCount: number
    userId: string

    reactionType: string | null;
    reactions: ReactionSummary[];

    // just ui
    selectedReaction?: number;
    // replies?: Comment[];
    // showReplies?: boolean;
}

export interface GetCommentsRequest {
    contentType: number;
    contentId: number;
    pageIndex: number;
    pageSize: number;
}

export interface CreateCommentRequest {
    contentId: number;
    contentType: number;
    text: string;
    parentCommentId: number | null;
}

export interface GetRepliesRequest {
    commentId: number;
    pageIndex: number;
    pageSize: number;
}