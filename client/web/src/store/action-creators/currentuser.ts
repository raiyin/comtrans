import { CurrentUserAction, CurrentUserActionTypes } from "../../types/currentuser";
import { Dispatch } from 'redux';

export const setCurrentUser = (user: string) => {
    return async (dispatch: Dispatch<CurrentUserAction>) => {
        dispatch({ type: CurrentUserActionTypes.SET_CURRENT_USER, payload: user });
    };
};
