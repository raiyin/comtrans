import { IUser } from "../IUser";

// export interface AuthResponse {
//     token: string;
//     user: IUser;
// }

interface Token {
    token: string
}

export interface AuthResponse {
    data: Token & IUser;
    success: boolean;
    message: string;
}

export type LoginResponse = {
    data: Token & IUser;
    success: boolean;
    message: string;
};
