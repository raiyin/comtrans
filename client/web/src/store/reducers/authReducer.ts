import { AuthAction, AuthActionTypes, AuthState, AuthenticationState } from '../../types/auth';

const initialState: AuthenticationState = {
    currentUser: {
        username: '',
        email: '',
        isActivated: false,
        token: ''
    },
    authState: AuthState.Anonym
};

export const authReducer = (state = initialState, action: AuthAction): AuthenticationState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_PROCCESSING:
            // return { ...state, isProccessing: action.payload };
            return { ...state };
        case AuthActionTypes.REGISTRATION_SUCCESS:
            return { ...state };
        // return { ...state, isProccessing: false };
        case AuthActionTypes.REGISTRATION_ERROR:
            return { ...state };
        // return { ...state, isProccessing: false };
        case AuthActionTypes.ACTIVATE:
            return { ...state };
        // return { ...state, isProccessing: true };
        case AuthActionTypes.LOGGED_IN:
            return { ...action.payload };
        case AuthActionTypes.LOGOUT:
            return { ...state, currentUser: action.payload.currentUser };
        case AuthActionTypes.CHECKAUTH:
            return { ...state, currentUser: { ...action.payload.currentUser, token: state.currentUser.token } };
        default:
            return state;
    }
};
