export interface Story {
    id: number;
    username: string;
    avatar: string | null;
    hasUnseenStory: boolean;
    isOwnStory?: boolean;
}