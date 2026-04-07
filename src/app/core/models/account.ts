export interface LoginData {
    emailOrUserName: string;
    password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    profilePicture: File | string | null;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}