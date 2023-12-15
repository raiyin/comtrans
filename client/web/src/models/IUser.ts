export interface IUser {
    username: string;
    email: string;
    isActivated: boolean;
    token: string;
}

export interface UserDto {
    username: string;
    email: string;
    isActivated: boolean;
}
