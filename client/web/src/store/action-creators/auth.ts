import axios from "axios";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { AuthState, AuthAction, AuthActionTypes, RegisterData } from "../../types/auth";
import { Dispatch } from 'redux';
import { AuthResponse } from "../../models/response/AuthResponse";
import { API_URL } from "../../http";

export const register = (registerData: RegisterData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            const response = await AuthService.registration(registerData.email, registerData.password);
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

export const login = (registerData: RegisterData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING });
            const response = await AuthService.login(registerData.email, registerData.password);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
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
