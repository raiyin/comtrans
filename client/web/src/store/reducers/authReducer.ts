import { AuthAction, AuthActionTypes, AuthState } from '../../types/auth';

const initialState: AuthState = {
    currentUser: {
        id: '',
        email: '',
        isActivated: false,
    },
    isAuth: false,
    isLoading: false
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload.currentUser };
        default:
            return state;
    }
};
