import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import cl from './login.module.scss';
import { Alert, Button, FormControl, Snackbar, TextField } from '@mui/material';
import { LoginData } from '../../types/auth';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpenState, setAlertOpenState] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

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

        const result = await login(loginData);

        if (!result) {
            setAlertMessage(() => 'An error occurred while logging in');
            openAlert();
            return;
        }

        clearFields();
        navigate('/', { replace: true });
    };

    function onEmailChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEmail(() => e.target.value);
    }

    function onPasswordChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setPassword(() => e.target.value);
    }

    return (

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
                    onClick={(event) => loginUser(event)}
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

    );
};

export default Login;
