import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse, LoginResponse } from "../models/response/AuthResponse";
import { RegisterData } from "../types/auth";
import { IUser, UserDto } from "../models/IUser";

export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/login', { email, password });
    }

    static async registration(registerData: RegisterData): Promise<AxiosResponse<AuthResponse>> {
        //static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', { registerData });
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<UserDto>> {
        return $api.get<UserDto>('/auth/check');
    }
}
