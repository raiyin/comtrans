import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import cl from './login.module.scss';
import { Alert, Button, CircularProgress, FormControl, Snackbar, TextField } from '@mui/material';
import { AuthState, LoginData } from '../../types/auth';
import { useNavigate } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpenState, setAlertOpenState] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const authState = useTypedSelector(state => state.authStateReducer.authState);
    const {
        login
    } = useActions();


    const onAlertSnackbarClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpenState(false);
    };

    const openAlert = () => {
        setAlertOpenState(true);
    };

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    const loginUser = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const loginData: LoginData = {
            email, password
        };

        await login(loginData);

        // TODO обработать в try catch, наверху не перехватывать
        if (authState === AuthState.Loggedin) {
            clearFields();
            navigate('/', { replace: true });
        }
        else {
            setAlertMessage(() => 'An error occurred while logging in');
            openAlert();
        }
    };

    function onEmailChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEmail(() => e.target.value);
    }

    function onPasswordChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setPassword(() => e.target.value);
    }

    return (
        authState === AuthState.Loggingin ?

            <div className={cl['login']} >
                <CircularProgress variant="indeterminate" />
            </div>
            :
            <div className={cl['login']} >

                <FormControl className={cl['login-form']}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '20px'
                    }}
                >

                    <span className={cl['login-form__header']}>
                        Welcome
                    </span>

                    <TextField
                        sx={{ width: '300px', marginTop: '20px' }}
                        id={`email`}
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={onEmailChange} />

                    <TextField
                        sx={{ width: '300px', marginTop: '20px' }}
                        id={`password`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        value={password}
                        onChange={onPasswordChange} />

                    <Button
                        sx={{ marginTop: '20px' }}
                        variant="outlined"
                        type="submit"
                        onClick={loginUser}
                    >
                        Login
                    </Button>
                </FormControl>

                <Snackbar
                    open={alertOpenState}
                    autoHideDuration={4000}
                    onClose={onAlertSnackbarClose}>
                    <Alert
                        onClose={onAlertSnackbarClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div >
    )
};

export default Login;
