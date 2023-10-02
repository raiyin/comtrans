import { AuthAction, AuthActionTypes, AuthState } from '../../types/auth';

const initialState: AuthState = {
    currentUser: {
        username: '',
        email: '',
        isActivated: false,
        token: ''
    },
    isAuth: false,
    isProccessing: false
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.IS_AUTH_PROCCESSING:
            return { ...state, isProccessing: action.payload };
        case AuthActionTypes.REGISTER_SUCCESS:
            return { ...state, isProccessing: false };
        case AuthActionTypes.ACTIVATE:
            return { ...state, isProccessing: true };
        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...action.payload };
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
