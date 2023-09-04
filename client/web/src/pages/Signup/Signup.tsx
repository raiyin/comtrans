import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import cl from './signup.module.scss';
import { Button, FormControl, TextField } from '@mui/material';
import validateEmail from '../../utils/email';


const Signup = () => {

    const [login, setLogin] = useState('');
    const [wasLoginModified, setWasLoginModified] = useState(false);

    const [email, setEmail] = useState('');
    const [wasEmailModified, setWasEmailModified] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');

    const [password, setPassword] = useState('');
    const [wasPasswordModified, setWasPasswordModified] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [wasConfirmPasswordModified, setWasConfirmPasswordModified] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const loginChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasLoginModified(true);
        setLogin(() => e.target.value);
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

    const registerUser = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    };

    return (

        <div className={cl['signup']} >

            <FormControl className={cl['signup-form']}>

                <span className={cl['signup-form__header']}>
                    Welcome
                </span>

                <TextField
                    sx={{ width: '300px', marginTop: '20px' }}
                    id={`login`}
                    label="Login"
                    variant="outlined"
                    required
                    size="small"
                    value={login}
                    // helperText={login === '' && wasLoginModified ? 'Empty field!' : ' '}
                    onChange={loginChangeHandler}
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
                    // helperText={password === "" && wasPasswordModified ? 'Empty field!' : ' '}
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
        </div >
    );
};

export default Signup;
