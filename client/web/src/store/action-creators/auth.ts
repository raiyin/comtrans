import { AuthState, AuthAction, AuthActionTypes } from "../../types/auth";
import { Dispatch } from 'redux';

export const setCurrentUser = (authState: AuthState) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.SET_CURRENT_USER, payload: authState });
    };
};
