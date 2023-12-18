import AuthService from "../../services/AuthService";
import { AuthAction, AuthActionTypes, RegisterData, LoginData, AuthState, AuthenticationState, UserDto, IUser } from "../../types/auth";
import { Dispatch } from 'redux';

export const register = (registerData: RegisterData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.AUTH_PROCCESSING,
                payload: AuthState.Signingup
            });
            const response = await AuthService.registration(registerData.email, registerData.password, registerData.username);
            dispatch({
                type: AuthActionTypes.REGISTRATION_SUCCESS,
                payload: AuthState.Signedup
            });
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: {
                    currentUser: {
                        username: "",
                        email: "",
                        isActivated: false,
                    },
                    authState: AuthState.Anonym
                }
            });
        }
    };
};

export const login = (loginData: LoginData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.AUTH_PROCCESSING,
                payload: AuthState.Loggingin
            });
            const response = await AuthService.login(loginData.email, loginData.password);
            const responseData = response.data.data;
            const { token, ...user } = responseData;
            localStorage.setItem('token', token);
            dispatch({
                type: AuthActionTypes.LOGGED_IN,
                payload: {
                    currentUser: user,
                    authState: AuthState.Loggedin,
                }
            });
        } catch (e: any) {
            console.log(`Error while login is: ${e.response}`);
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: {
                    currentUser: {
                        username: "",
                        email: "",
                        isActivated: false,
                    },
                    authState: AuthState.Anonym
                }
            });
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.AUTH_PROCCESSING,
                payload: AuthState.Loggingin
            });
            await AuthService.logout();
            localStorage.removeItem('token');
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: {
                    currentUser: {} as IUser,
                    authState: AuthState.Anonym,
                }
            });
        } catch (e: any) {
            console.log('Error while logout is: ' + e.response?.data?.message);
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActionTypes.AUTH_PROCCESSING,
            payload: AuthState.Loggingin
        });
        try {
            const response = await AuthService.checkAuth();
            // TODO проверить на 401
            const isLoggedIn = true; // так как сервер выкинет исключение на неавторизованный запрос
            if (isLoggedIn) {
                console.log('data is: ' + JSON.stringify(response.data))
                dispatch({
                    type: AuthActionTypes.CHECKAUTH,
                    payload: {
                        currentUser: { ...response.data.data },
                        authState: AuthState.Loggedin
                    }
                });
            }
            else {
                dispatch({
                    type: AuthActionTypes.CHECKAUTH,
                    payload: {
                        currentUser: {} as IUser,
                        authState: AuthState.Anonym
                    }
                });
            }
        } catch (e: any) {
            console.log('Error while checkauth is: ' + JSON.stringify(e));
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: {} as AuthenticationState
            });
        }
    };
};
