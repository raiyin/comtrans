import { IUser } from "../../types/auth";

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
