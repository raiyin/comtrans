import { IUser } from "../models/IUser";

export interface AuthState {
    currentUser: IUser;
    isAuth: boolean;
    isProccessing: boolean;
}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export enum AuthActionTypes {
    REGISTER = 'REGISTER',
    AUTH_PROCCESSING = 'AUTH_PROCCESSING',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTRATION_ERROR = 'REGISTRATION_ERROR',
    ACTIVATE = 'ACTIVATE',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOGOUT',
    CHECKAUTH = 'CHECKAUTH'
}


interface AuthProccessingAction {
    type: AuthActionTypes.AUTH_PROCCESSING;
}

interface RegisterAction {
    type: AuthActionTypes.REGISTER;
    payload: boolean;
}

interface RegistrationErrorAction {
    type: AuthActionTypes.REGISTRATION_ERROR;
}

interface RegistrationSuccessAction {
    type: AuthActionTypes.REGISTER_SUCCESS;
    payload: AuthState;
}

interface ActiveteAction {
    type: AuthActionTypes.ACTIVATE;
    payload: AuthState;
}

interface LoginSaccessAction {
    type: AuthActionTypes.LOGIN_SUCCESS;
    payload: AuthState;
}

interface LoginErrorAction {
    type: AuthActionTypes.LOGIN_ERROR;
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
    payload: AuthState;
}

interface CheckAuthAction {
    type: AuthActionTypes.CHECKAUTH;
    payload: AuthState;
}

export type AuthAction =
    AuthProccessingAction
    | RegisterAction
    | RegistrationErrorAction
    | RegistrationSuccessAction
    | LoginSaccessAction
    | LoginErrorAction
    | ActiveteAction
    | LogoutAction
    | CheckAuthAction;
