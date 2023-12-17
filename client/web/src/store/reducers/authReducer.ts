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
            return { ...state };
        case AuthActionTypes.REGISTRATION_SUCCESS:
            return { ...state };
        case AuthActionTypes.REGISTRATION_ERROR:
            return { ...state };
        case AuthActionTypes.ACTIVATE:
            return { ...state };
        case AuthActionTypes.LOGGED_IN:
            return { ...action.payload };
        case AuthActionTypes.LOGOUT:
            return { ...state, currentUser: action.payload.currentUser };
        case AuthActionTypes.CHECKAUTH:
            return {
                ...state,
                currentUser: {
                    ...action.payload.currentUser,
                    token: state.currentUser.token
                },
                authState: action.payload.authState
            };
        default:
            return state;
    }
};
