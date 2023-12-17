import { UserDto } from "../../types/auth";

interface Token {
    token: string
}

export interface AuthResponse {
    data: Token & UserDto;
    success: boolean;
    message: string;
}

export type LoginResponse = {
    data: Token & UserDto;
    success: boolean;
    message: string;
};
