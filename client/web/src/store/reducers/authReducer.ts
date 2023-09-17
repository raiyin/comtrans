import { AuthAction, AuthActionTypes, AuthState } from '../../types/auth';

const initialState: AuthState = {
    currentUser: {
        id: '',
        email: '',
        isActivated: false,
    },
    isAuth: false,
    isProccessing: false
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_PROCCESSING:
            return { ...state, isProccessing: true };
        case AuthActionTypes.REGISTER_SUCCESS:
            return { ...state, isProccessing: false };
        case AuthActionTypes.ACTIVATE:
            return { ...state, isProccessing: true };
        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...state, currentUser: action.payload.currentUser };
        case AuthActionTypes.LOGIN_ERROR:
            return { ...state };
        case AuthActionTypes.LOGOUT:
            return { ...state, currentUser: action.payload.currentUser };
        case AuthActionTypes.CHECKAUTH:
            return { ...state, currentUser: action.payload.currentUser };
        default:
            return state;
    }
};
