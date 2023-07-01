import { CurrentUserAction, CurrentUserActionTypes, CurrentUserState } from '../../types/currentuser';

const initialState: CurrentUserState = {
    currentUser: ''
};

export const currentUserReducer = (state = initialState, action: CurrentUserAction): CurrentUserState => {
    switch (action.type) {
        case CurrentUserActionTypes.SET_CURRENT_USER:
            return { currentUser: action.payload };
        default:
            return state;
    }
};
