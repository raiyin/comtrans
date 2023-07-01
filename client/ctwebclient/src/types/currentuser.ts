export interface CurrentUserState {
    currentUser: string;
}

export enum CurrentUserActionTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
}

interface SetCurrentUserAction {
    type: CurrentUserActionTypes.SET_CURRENT_USER;
    payload: string;
}

export type CurrentUserAction = SetCurrentUserAction;
