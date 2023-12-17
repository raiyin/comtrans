
export interface UserDto {
    username: string;
    email: string;
    isActivated: boolean;
}

export enum AuthState {
    Anonym = 1,
    Signingup = 2,
    Signedup = 3,
    Loggingin = 4,
    Loggedin = 5
}

export interface AuthenticationState {
    currentUser: UserDto;
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
    payload: AuthState;
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
