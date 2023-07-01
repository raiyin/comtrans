
import { combineReducers } from 'redux';
import { currentUserReducer } from "./userReducer";

export const rootReducer = combineReducers({
    currentuser: currentUserReducer
});

export type RootState = ReturnType<typeof rootReducer>;
