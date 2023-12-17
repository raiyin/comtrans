import { IUser, UserDto } from "../models/IUser";


export enum AuthState {
    Anonym,
    Signingup,
    Signedup,
    Loggingin,
    Loggedin
}

export interface AuthenticationState {
    currentUser: IUser;
    authState: AuthState;
}

export interface CheckAuthState {
    currentUser: UserDto;
    authState: AuthState;
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
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_ERROR = 'REGISTRATION_ERROR',
    ACTIVATE = 'ACTIVATE',
    LOGGED_IN = 'LOGGED_IN',
    LOGOUT = 'LOGOUT',
    CHECKAUTH = 'CHECKAUTH'
}


interface AuthProccessingAction {
    type: AuthActionTypes.AUTH_PROCCESSING;
    payload: boolean;
}

interface RegisterAction {
    type: AuthActionTypes.REGISTER;
    payload: boolean;
}

interface RegistrationErrorAction {
    type: AuthActionTypes.REGISTRATION_ERROR;
}

interface RegistrationSuccessAction {
    type: AuthActionTypes.REGISTRATION_SUCCESS;
    payload: AuthenticationState;
}

interface ActiveteAction {
    type: AuthActionTypes.ACTIVATE;
    payload: AuthenticationState;
}

interface LoginSaccessAction {
    type: AuthActionTypes.LOGGED_IN;
    payload: AuthenticationState;
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
    payload: AuthenticationState;
}

interface CheckAuthAction {
    type: AuthActionTypes.CHECKAUTH;
    payload: CheckAuthState;
}

export type AuthAction =
    AuthProccessingAction
    | RegisterAction
    | RegistrationErrorAction
    | RegistrationSuccessAction
    | LoginSaccessAction
    | ActiveteAction
    | LogoutAction
    | CheckAuthAction;
