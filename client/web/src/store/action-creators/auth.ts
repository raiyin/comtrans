import axios from "axios";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { AuthAction, AuthActionTypes, RegisterData, LoginData } from "../../types/auth";
import { Dispatch } from 'redux';
import { AuthResponse } from "../../models/response/AuthResponse";
import { API_URL } from "../../http";

export const register = (registerData: RegisterData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            const response = await AuthService.registration(registerData);
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
                payload: {
                    currentUser: response.data.user,
                    isAuth: false,
                    isProccessing: false,
                }
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch({
                type: AuthActionTypes.REGISTRATION_ERROR
            });
        }
    };
};

export const login = (loginData: LoginData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            console.log(`sending...`);
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            const response = await AuthService.login(loginData.email, loginData.password);
            const user = response.data.data;
            localStorage.setItem('token', user.token);
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: {
                    currentUser: user,
                    isAuth: true,
                    isProccessing: false,
                }
            });
        } catch (e: any) {
            console.log(`error ${e.response}`);
            dispatch({
                type: AuthActionTypes.LOGIN_ERROR
            });
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            await AuthService.logout();
            localStorage.removeItem('token');
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: {
                    currentUser: {} as IUser,
                    isAuth: false,
                    isProccessing: false,
                }
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: {
                    currentUser: response.data.user,
                    isAuth: true,
                    isProccessing: false,
                }
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch({
                type: AuthActionTypes.LOGIN_ERROR
            });
        }
    };
};
