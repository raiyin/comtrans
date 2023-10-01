import { IUser } from "../IUser";

export interface AuthResponse {
    token: string;
    user: IUser;
}

export type LoginResponse = {
    data: IUser;
    success: boolean;
    message: string;
};
