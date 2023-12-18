import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import cl from './signup.module.scss';
import { Alert, Button, CircularProgress, FormControl, Snackbar, TextField } from '@mui/material';
import validateEmail from '../../utils/email';
import { AuthState, RegisterData } from '../../types/auth';
import AuthService from '../../services/AuthService';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Signup = () => {

    const {
        register
    } = useActions();
    const authState = useTypedSelector(state => state.authStateReducer.authState);

    const [username, setUsername] = useState('');
    const [wasUsernameModified, setWasUsernameModified] = useState(false);

    const [email, setEmail] = useState('');
    const [wasEmailModified, setWasEmailModified] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');

    const [password, setPassword] = useState('');
    const [wasPasswordModified, setWasPasswordModified] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [wasConfirmPasswordModified, setWasConfirmPasswordModified] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const [alertOpenState, setAlertOpenState] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasUsernameModified(true);
        setUsername(() => e.target.value);
    };

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasEmailModified(true);
        setEmail(() => e.target.value);
    };

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasPasswordModified(true);
        setPassword(() => e.target.value);
    };

    const confirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasConfirmPasswordModified(true);
        setConfirmPassword(() => e.target.value);
    };

    const onAlertSnackbarClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpenState(false);
    };

    useEffect(() => {
        if (wasEmailModified && !validateEmail(email)) {
            setEmailErrorText(() => 'Please enter a correct email');
        }
        else {
            setEmailErrorText(() => '');
        }
    }, [email]);

    useEffect(() => {
        if (wasConfirmPasswordModified && confirmPassword !== password) {
            setPasswordErrorText(() => 'Passwords must be equal');
        }
        else {

            setPasswordErrorText(() => '');
        }
    }, [confirmPassword]);

    const openAlert = () => {
        setAlertOpenState(true);
    };

    const clearFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const registerUser = async (event: React.MouseEvent<HTMLElement>) => {

        event.preventDefault();
        const registerData: RegisterData = {
            username: username,
            password: password,
            email: email
        };

        await register(registerData);
        console.log(JSON.stringify(authState))

        if (authState === AuthState.Signedup) {
            clearFields();
            navigate('/activation/needed', { replace: true });
        }
        else {
            setAlertMessage(() => 'An error occurred while signing up');
            openAlert();
        }
    };

    return (
        <>{
            authState === AuthState.Signingup
                ?
                <div className={cl['signup']} >
                    <CircularProgress variant="indeterminate" />
                </div>
                :
                <div className={cl['signup']} >

                    <FormControl className={cl['signup-form']}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '20px'
                        }}
                    >

                        <span className={cl['signup-form__header']}>
                            Welcome
                        </span>

                        <TextField
                            sx={{ width: '300px', marginTop: '20px' }}
                            id={`username`}
                            label="Username"
                            variant="outlined"
                            required
                            size="small"
                            value={username}
                            onChange={usernameChangeHandler}
                        />

                        <TextField
                            sx={{ width: '300px', marginTop: '20px' }}
                            id={`email`}
                            label="Email"
                            variant="outlined"
                            value={email}
                            size="small"
                            required
                            helperText={emailErrorText}
                            onChange={emailChangeHandler}
                        />

                        <TextField
                            sx={{ width: '300px', marginTop: '20px' }}
                            id={`password`}
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            size="small"
                            required
                            onChange={passwordChangeHandler}
                        />

                        <TextField
                            sx={{ width: '300px', marginTop: '20px' }}
                            id={`confirm_password`}
                            label="Confirm password"
                            type="password"
                            variant="outlined"
                            value={confirmPassword}
                            size="small"
                            required
                            helperText={passwordErrorText}
                            onChange={confirmPasswordChangeHandler}
                        />

                        <Button
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            type="submit"
                            onClick={(event) => registerUser(event)}
                        >
                            Sign up
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
        }

        </>
    );

};

export default Signup;
