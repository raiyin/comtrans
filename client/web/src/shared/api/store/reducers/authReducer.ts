import { AuthAction, AuthActionTypes} from '../auth';
import { AuthState, AuthenticationState } from '../models';

const initialState: AuthenticationState = {
    currentUser: {
        username: '',
        email: '',
        isActivated: false
    },
    authState: AuthState.Anonym
};

export const authReducer = (state = initialState, action: AuthAction): AuthenticationState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_PROCCESSING:
            return {
                ...state,
                authState: action.payload
            };
        case AuthActionTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                authState: action.payload
            };
        case AuthActionTypes.REGISTRATION_ERROR:
            return { ...state };
        case AuthActionTypes.ACTIVATE:
            return { ...state };
        case AuthActionTypes.LOGGED_IN:
            return { ...action.payload };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                authState: action.payload.authState
            };
        case AuthActionTypes.CHECKAUTH:
            return {
                ...state,
                currentUser: {
                    ...action.payload.currentUser
                },
                authState: action.payload.authState
            };
        default:
            return state;
    }
};
