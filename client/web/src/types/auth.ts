import { IUser } from "../models/IUser";

export interface AuthState {
    currentUser: IUser;
    isAuth: boolean;
    isLoading: boolean;
}

export enum AuthActionTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
}

interface SetAuthAction {
    type: AuthActionTypes.SET_CURRENT_USER;
    payload: AuthState;
}

export type AuthAction = SetAuthAction;
