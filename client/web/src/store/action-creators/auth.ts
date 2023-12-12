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
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: true });
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
        finally {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: false });
        }
    };
};

export const login = (loginData: LoginData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: true });
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
        finally {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: false });
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: true });
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


    console.log('dispatch')

    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: true });
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/check`, { withCredentials: true });
            // TODO проверить на 401
            const user = response.data.user;
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
            console.log(e.response?.data?.message);
            dispatch({
                type: AuthActionTypes.LOGIN_ERROR
            });
        }
        finally {
            dispatch({ type: AuthActionTypes.AUTH_PROCCESSING, payload: false });
        }
    };
};
