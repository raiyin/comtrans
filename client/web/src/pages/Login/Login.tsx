import React, { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import cl from './login.module.scss';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { LoginData } from '../../types/auth';
import { useNavigate } from "react-router-dom";
import { login } from '../../utils/requests';


const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

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

    const onSubmit = (data: any) => {
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
            setAlertMessage(() => 'Ошибка регистрации пользователя.');
            openAlert();
            return;
        }

        clearFields();
        navigate('/', { replace: true });
    };

    return (

        <div className={cl['login']} >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cl['login-form']}>

                <span className={cl['login-form__header']}>
                    Welcome
                </span>

                <TextField
                    sx={{ width: '300px', marginTop: '20px' }}
                    id={`email`}
                    label="Email"
                    variant="outlined"
                    size="small"
                    {...register(`email`, { required: true })} />

                <TextField
                    sx={{ width: '300px', marginTop: '20px' }}
                    id={`password`}
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    {...register(`password`, { required: true })} />

                <Button
                    sx={{ marginTop: '20px' }}
                    variant="outlined"
                    type="submit"
                    onClick={(event) => loginUser(event)}
                >
                    Login
                </Button>
            </form>


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
