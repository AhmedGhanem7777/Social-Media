export interface Story {
    id: number;
    username: string;
    avatar: string;
    hasUnseenStory: boolean;
    isOwnStory?: boolean;
}